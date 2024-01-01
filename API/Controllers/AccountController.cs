using API.Services;
using Domain.ClientDTOs.User;
using Domain.DataModels.Skills;
using Domain.DataModels.Transactions;
using Domain.DataModels.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace API.Controllers 
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        public readonly UserManager<ApplicationUser> _userManager;
        public readonly DataContext _context;
        private readonly TokenService _tokenService;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            DataContext context,
            TokenService tokenService
        )
        {
            _userManager = userManager;
            _context = context;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginDTO login)
        {
            ApplicationUser user;
            // Check if user used phonenumber or username for login
            if (login.strLogin.Length == 10 && login.strLogin.All(char.IsDigit))
            {
                user = await _context.ApplicationUsers
                    .Where(q => q.PhoneNumber == login.strLogin)
                    .FirstOrDefaultAsync();
            }
            else
            {
                user = await _userManager.FindByNameAsync(login.strLogin);
            }

            user = await _userManager.FindByNameAsync(login.strLogin);

            if (user == null)
                return Unauthorized("User doesn't exist.");

            var result = await _userManager.CheckPasswordAsync(user, login.strPassword);
            if (result)
            {
                var token = _tokenService.CreateToken(user);
               
                return token;
            }
            return Unauthorized("Password is not correct.");
        }
        
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(RegisterDTO register)
        {
            // If fails, return error code and stop executing
            var validation = await ValidateUserInput(register);
            if (validation is BadRequestObjectResult)
            {
                return validation;
            }

            // START TRANSACTION
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Create User
                ApplicationUser user =
                    new()
                    {
                        
                        UserName = register.user_name.ToLower(),
                        UserTypeId = register.UserTypeId, 
                        FieldOfWork = register.FieldOfWork.ToLower(),
                        JobTitle = register.JobTitle.ToLower(),
                        Bio = register.Bio.ToLower(),
                        FirstName = register.FirstName.ToLower(),
                        LastName = register.LastName.ToLower(),
                        Email = register.Email.ToLower(),
                        RegistrationDate = DateTime.UtcNow,
                       
            };

                var result = await _userManager.CreateAsync(user, register.Password);

                if (result.Succeeded)
                {
                    if (user.UserTypeId == 3)
                    {
                        if (register.Skills.Count > 0)
                        {
                            foreach (var skill in register.Skills)
                            {
                                var addedSkill = new UserSkill
                                {
                                    skillId = skill,
                                    UserId = user.Id
                                };
                                await _context.UserSkills.AddAsync(addedSkill);
                                await _context.SaveChangesAsync();
                            }
                        }
                    }

                   var wallet = new Wallet  { 
                        UserId = user.Id,
                        Balance = 0
                    
                    };
                    await _context.Wallets.AddAsync(wallet);
                    await _context.SaveChangesAsync();

                    await transaction.CommitAsync();
                    Console.WriteLine("User registration successful."); // Debugging statement
                    return _tokenService.CreateToken(user);
                }

                // Rollback changes if failed
                await transaction.RollbackAsync();
                Console.WriteLine("User registration failed. Errors: ");
                foreach (var error in result.Errors)
                {
                    Console.WriteLine(error.Description); // Debugging statement
                }
                return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                Console.WriteLine("An exception occurred during registration: " + ex.Message); // Debugging statement
                await transaction.RollbackAsync();
                // Display error
                return BadRequest();
            }
        }

      
         // Private Methods
         private async Task<ActionResult> ValidateUserInput(RegisterDTO register)
         {
             // Duplicate validation

             if (await _userManager.Users.AnyAsync(q => q.Email == register.Email))
             {
                 return BadRequest("Email is already used.");
             }

            if (await _userManager.Users.AnyAsync(q => q.UserName == register.user_name))
            {
                return BadRequest("Username is already used.");
            }


            //white space validation

            if (string.IsNullOrWhiteSpace(register.FirstName))
            {
                return BadRequest("First name cannot be empty.");
            }

            if (string.IsNullOrWhiteSpace(register.LastName))
            {
                return BadRequest("Last name cannot be empty.");
            }

            if (string.IsNullOrWhiteSpace(register.user_name))
            {
                return BadRequest("UserName cannot be empty.");
            }

            if (string.IsNullOrWhiteSpace(register.Email))
            {
                return BadRequest("Email cannot be empty.");
            }

            if (string.IsNullOrWhiteSpace(register.FieldOfWork))
            {
                return BadRequest("Field of work cannot be empty.");
            }

            if (string.IsNullOrWhiteSpace(register.JobTitle))
            {
                return BadRequest("Job Title cannot be empty.");
            }

            //FreeLancer extra validation

            //also make the skill not empty

            if (register.UserTypeId == 3)
            {

                if (string.IsNullOrWhiteSpace(register.Bio))
                {
                    return BadRequest("Description cannot be empty.");
                }

            }


            //regex

            if (!Regex.IsMatch(register.FirstName, "^[a-zA-Z ]{2,}$"))
            {
                return BadRequest("First name must contain at least 2 characters, no numbers, and no special characters.");
            }

            if (!Regex.IsMatch(register.LastName, "^[a-zA-Z ]{2,}$"))
            {
                return BadRequest("Last name must contain at least 2 characters, no numbers, and no special characters.");
            }

            if (register.user_name.Length < 4)
            {
                return BadRequest("Username must be at least 4 characters long.");
            }

            if (!Regex.IsMatch(register.Email, @"^[^\s@]+@[^\s@]+\.[^\s@]+$"))
            {
                return BadRequest("Invalid email format.");
            }


            if (register.Password.Length < 8 || !Regex.IsMatch(register.Password, "(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}"))
            {
                return BadRequest("Password must be at least 8 characters long and include one digit, one special character, one lowercase letter, and one uppercase letter.");
            }
            //front add
            if (register.Password != register.ConfirmPassword)
            {
                return BadRequest("Password does not match Confirm Password");
            }

            if (!Regex.IsMatch(register.JobTitle, "^[a-zA-Z ]{4,}$"))
            {
                return BadRequest("Job title must be at least 4 characters long, no numbers, and no special characters.");
            }

            if (!Regex.IsMatch(register.FieldOfWork, "^[a-zA-Z ]{4,}$"))
            {
                return BadRequest("Field of work must be at least 4 characters long, no numbers, and no special characters.");
            }



            return Ok();
         }

        
         
    }
}