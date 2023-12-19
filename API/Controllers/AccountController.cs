using API.Services;
using Domain.ClientDTOs.User;
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
                        //  Rating = _context.UserRatings.Where(q => q.UserId == t.UserId).Select(r => r.Rating ).SingleOrDefault()
                        //Skills = _context.UserSkills.Where(q => q.UserId == _context.)
                        //Skills = register.Skills.ToLower(),
                      //  Skills = user.Skills.Add(new UserSkill { Skills = skill })
            };

                var result = await _userManager.CreateAsync(user, register.Password);

                if (result.Succeeded)
                {
                    /*// Store skills in UserSkills table
                    if (!string.IsNullOrEmpty(register.Skills))
                    {
                        var skills = register.Skills.Split(',').Select(skill => skill.Trim());

                        foreach (var skill in skills)
                        {
                            user.Skills.Add(new UserSkill { Skills = skill });
                        }
                    }*/

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

        /* [Authorize]
         [HttpPost("refresh")]
         public async Task<ActionResult<string>> RefreshToken()
         {
             var user = await _userManager.FindByNameAsync(User.FindFirstValue("username"));
             return _tokenService.CreateToken(user);
         }

         [Authorize]
         [HttpPut("update")]
         public async Task<ActionResult<string>> UpdateUserInfo(UserUpdateDTO userUpdateDTO)
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

             if (!string.IsNullOrWhiteSpace(userUpdateDTO.strNewUserName))
             {
                 if (
                     await _userManager.Users.AnyAsync(
                         q => q.UserName == userUpdateDTO.strNewUserName
                     )

                 )
                 {
                     return BadRequest("Username is already used.");
                 }

                 user.UserName = userUpdateDTO.strNewUserName;
                 user.NormalizedUserName = _userManager.NormalizeName(userUpdateDTO.strNewUserName);
             }

             if (!string.IsNullOrWhiteSpace(userUpdateDTO.strNewEmail))
             {
                 if (await _userManager.Users.AnyAsync(q => q.Email == userUpdateDTO.strNewEmail))
                 {
                     return BadRequest("Email is already used.");
                 }

                 user.Email = userUpdateDTO.strNewEmail;
                 user.NormalizedEmail = _userManager.NormalizeName(userUpdateDTO.strNewEmail);
             } //TODO There should be no email? 

             if (!string.IsNullOrWhiteSpace(userUpdateDTO.strNewPhoneNumber))
             {
                 if (
                     await _context.UserInfos.AnyAsync(
                         q => q.strPhoneNumber == userUpdateDTO.strNewPhoneNumber
                     )
                 )
                 {
                     return BadRequest("Phonenumber is already used.");
                 }

                 var userInfo = await _context.UserInfos.FindAsync(user.intUserInfoId);
                 userInfo.strPhoneNumber = userUpdateDTO.strNewPhoneNumber;
             }

             if (
                 !string.IsNullOrWhiteSpace(userUpdateDTO.strNewPassword)
                 && !string.IsNullOrWhiteSpace(userUpdateDTO.strOldPassword)
             )
             {
                 var result = await _userManager.ChangePasswordAsync(
                     user,
                     userUpdateDTO.strOldPassword,
                     userUpdateDTO.strNewPassword
                 );

                 if (!result.Succeeded)
                 {
                     return result.Errors.First().Description;
                 }
             }

             if (!string.IsNullOrWhiteSpace(userUpdateDTO.strNewLocation))
             {
                 // NOT IMPLEMENTED IN SYSTEM YET
             }

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
        */
         // Private Methods
         private async Task<ActionResult> ValidateUserInput(RegisterDTO register)
         {
             // Duplicate validation

             if (await _userManager.Users.AnyAsync(q => q.Email == register.Email))
             {
                 return BadRequest("Email is already used.");
             }



             return Ok();
         }

        
         
    }
}