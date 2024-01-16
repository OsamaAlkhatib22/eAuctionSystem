using API.Services;
using Domain.ClientDTOs.Profile;
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
using System.Threading;

namespace API.Controllers 
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        public readonly UserManager<ApplicationUser> _userManager;
        public readonly DataContext _context;
        private readonly TokenService _tokenService;
        private readonly IConfiguration _configuration;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            DataContext context,
            TokenService tokenService,
            IConfiguration configuration
        )
        {
            _userManager = userManager;
            _context = context;
            _tokenService = tokenService;
            _configuration = configuration;
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
                        RegistrationDate = DateTime.Now,
                       
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


        //update profile 
        [Authorize]
        [HttpPut("update")]
        public async Task<ActionResult<string>> UpdateUserInfo(ProfileUpdateDTO profileUpdateDTO)
        {
            string authHeader = Request.Headers["Authorization"];
            JwtSecurityTokenHandler tokenHandler = new();
            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(authHeader[7..]);

            var strUserName = jwtToken.Claims.First(c => c.Type == "username").Value;
            Console.WriteLine(strUserName);
            var user = await _userManager.FindByNameAsync(strUserName);
            Console.WriteLine("User: " + user);

            // Print token content
            Console.WriteLine("Token: " + jwtToken.RawData);
            Console.WriteLine("Issuer: " + jwtToken.Issuer);
            Console.WriteLine("Claims:");
            foreach (var claim in jwtToken.Claims)
            {
                Console.WriteLine($"{claim.Type}: {claim.Value}");
            }

            if (user == null)
            {
                return BadRequest("Bad security token.");
            }

        

            if (!string.IsNullOrWhiteSpace(profileUpdateDTO.strNewBio))
            {
                user.Bio = profileUpdateDTO.strNewBio;
            }
            if (!string.IsNullOrWhiteSpace(profileUpdateDTO.strNewFieldOfWork))
            {
                if (profileUpdateDTO.strNewFieldOfWork.Length < 5 || !Regex.IsMatch(profileUpdateDTO.strNewFieldOfWork, "^[a-zA-Z& ]+$"))
                {
                    return BadRequest("Field of work must be at least 5 characters long, and can only contain letters and the '&' character.");
                }
                user.FieldOfWork = profileUpdateDTO.strNewFieldOfWork;
            }
            if (!string.IsNullOrWhiteSpace(profileUpdateDTO.strNewJobTitle))
            {
                if (profileUpdateDTO.strNewJobTitle.Length < 5 || !Regex.IsMatch(profileUpdateDTO.strNewJobTitle, "^[a-zA-Z& ]+$"))
                {
                    return BadRequest("Job title must be at least 5 characters long, and can only contain letters and the '&' character.");
                }
                user.JobTitle = profileUpdateDTO.strNewJobTitle;
            }

            if (user.UserTypeId == 3)
            {
                if (profileUpdateDTO.strNewSkills != null && profileUpdateDTO.strNewSkills.Any())
                {
                    var existingSkills = await _context.UserSkills
            .Where(s => s.UserId == user.Id && profileUpdateDTO.strNewSkills.Contains(s.skillId))
            .ToListAsync();

                    if (existingSkills.Any())
                    {
                        return BadRequest("User already has some of the skills being added.");
                    }
                    // Update or add new skills
                    foreach (var skill in profileUpdateDTO.strNewSkills)
                    {
                        var userSkill = await _context.UserSkills
                            .FirstOrDefaultAsync(s => s.UserId == user.Id && s.skillId == skill);

                        if (userSkill == null)
                        {
                            // Skill doesn't exist for the user, add it
                            userSkill = new UserSkill
                            {
                                UserId = user.Id,
                                skillId = skill
                            };
                            await _context.UserSkills.AddAsync(userSkill);
                        }
                        
                    }
                }
            }



            if (
                !string.IsNullOrWhiteSpace(profileUpdateDTO.strNewPassword)
                && !string.IsNullOrWhiteSpace(profileUpdateDTO.strOldPassword)
            )
            {
                var result = await _userManager.ChangePasswordAsync(
                    user,
                    profileUpdateDTO.strOldPassword,
                    profileUpdateDTO.strNewPassword
                );

                if (!result.Succeeded)
                {
                    return result.Errors.First().Description;
                }
            }
           

         /*  if (profileUpdateDTO.ProfileMediaRef != null)
            {
                string extension = Path.GetExtension(profileUpdateDTO.ProfileMediaRef);
                string fileName = $"{DateTime.UtcNow.Ticks}{extension}";
                string directory = _configuration["ProfilePicturePath"]; // Change this to your desired directory
                string filePath = Path.Join(directory, fileName);

                Directory.CreateDirectory(directory);

                using var stream = File.Create(filePath);
                await profileUpdateDTO.ProfileMediaRef.CopyToAsync(stream, cancellationToken);

                // Update the user's profile picture reference
                user.ProfileMediaRef = filePath;
            }*/

                using var transaction = await _context.Database.BeginTransactionAsync();
            {
                try
                {
                    await _userManager.UpdateAsync(user);
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    return StatusCode(500, "An error occurred while updating user information.");
                }
            }

            return _tokenService.CreateToken(user);
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

            if (!Regex.IsMatch(register.JobTitle, "^[a-zA-Z& ]{5,}$"))
            {
                return BadRequest("Job title must be at least 5 characters long, no numbers, and only & is allowed.");
            }

            if (!Regex.IsMatch(register.FieldOfWork, "^[a-zA-Z& ]{5,}$"))
            {
                return BadRequest("Field of work must be at least 5 characters long, no numbers, and only & is allowed.");
            }



            return Ok();
         }

        
         
    }
}