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



            return Ok();
         }

        
         
    }
}