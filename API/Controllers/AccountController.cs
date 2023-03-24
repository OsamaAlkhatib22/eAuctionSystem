using API.Resources;
using API.Services;
using Domain.ClientDTOs;
using Domain.DataModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.IdentityModel.Tokens;
using Persistence;
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
        public async Task<ActionResult<UserDTO>> Login(LoginDTO login)
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

            if (user == null)
                return Unauthorized("User doesn't exist.");

            var result = await _userManager.CheckPasswordAsync(user, login.strPassword);
            if (result)
            {
                user.UserInfo = await _context.UserInfos.FindAsync(user.intUserType);
                return CreateUserDTO(user);
            }
            return Unauthorized("Password is not correct.");
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO register)
        {
            // If fails, return error code and stop executing
            var validation = await ValidateUserInput(register);
            if (validation is BadRequestObjectResult)
            {
                return validation;
            }

            // Set empty properties to null for database
            foreach (var prop in register.GetType().GetProperties())
            {
                prop.SetValue(register, EmptyToNull(prop.GetValue(register).ToString()));
            }

            // START TRANSACTION
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                EntityEntry<UserInfo> userInfo = await InsertUserInfo(register);
                await _context.SaveChangesAsync();

                // Query user type
                UserType userType = await _context.UserTypes
                    .Where(q => q.strName == ConstantsDB.UserTypes.User)
                    .FirstOrDefaultAsync();

                // Create User
                ApplicationUser user =
                    new()
                    {
                        UserName = register.strUsername.ToLower(),
                        PhoneNumber = register.strPhonenumber,
                        intUserType = userType.intId,
                        intUserInfo = userInfo.Entity.intId,
                        UserInfo = userInfo.Entity
                    };

                var result = await _userManager.CreateAsync(user, register.strPassword);

                if (result.Succeeded)
                {
                    await transaction.CommitAsync();
                    return CreateUserDTO(user);
                }

                // Rollback changes if failed
                await transaction.RollbackAsync();
                return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                // Display error
                return BadRequest();
            }
        }

        [Authorize]
        [HttpPost("refresh")]
        public async Task<ActionResult<string>> RefreshToken()
        {
            var user = await _userManager.FindByNameAsync(User.FindFirstValue(ClaimTypes.Name));
            return _tokenService.CreateToken(user);
        }

        // Private Methods
        private async Task<ActionResult> ValidateUserInput(RegisterDTO register)
        {
            // Duplicate validation

            if (await _userManager.Users.AnyAsync(q => q.UserName == register.strUsername))
            {
                return BadRequest("Username is already used.");
            }

            if (await _userManager.Users.AnyAsync(q => q.PhoneNumber == register.strPhonenumber))
            {
                return BadRequest("Phonenumber is already used.");
            }

            if (
                register.strNationalId != null
                && await _context.UserInfos
                    .Where(q => q.strNationalId == register.strNationalId)
                    .FirstOrDefaultAsync() != null
            )
            {
                return BadRequest("National ID is already used.");
            }

            if (
                register.strNationalIdNumber != null
                && await _context.UserInfos
                    .Where(q => q.strNationalIdNumber == register.strNationalIdNumber)
                    .FirstOrDefaultAsync() != null
            )
            {
                return BadRequest("ID number is already used.");
            }

            if (
                register.strRegistrationNumber != null
                && await _context.UserInfos
                    .Where(q => q.strRegistrationNumber == register.strRegistrationNumber)
                    .FirstOrDefaultAsync() != null
            )
            {
                return BadRequest("Registration number is already used.");
            }

            if (
                register.strPassportNumber != null
                && await _context.UserInfos
                    .Where(q => q.strPassportNumber == register.strPassportNumber)
                    .FirstOrDefaultAsync() != null
            )
            {
                return BadRequest("Passport number is already used.");
            }
            ///

            // Null validation
            if (
                register.strNationalId.IsNullOrEmpty()
                && register.strRegistrationNumber.IsNullOrEmpty()
                && register.strPassportNumber.IsNullOrEmpty()
            )
            {
                return BadRequest("Identifier must be entered (Id, Id number or Passport).");
            }
            ///

            return Ok();
        }

        private async Task<EntityEntry<UserInfo>> InsertUserInfo(RegisterDTO register)
        {
            return await _context.UserInfos.AddAsync(
                new UserInfo
                {
                    strFirstName = register.strFirstName.ToLower(),
                    strLastName = register.strLastName.ToLower(),
                    strNationalId = register.strNationalId,
                    strNationalIdNumber = register.strNationalIdNumber?.ToUpper(),
                    strPassportNumber = register.strPassportNumber?.ToUpper(),
                    strRegistrationNumber = register.strRegistrationNumber,
                }
            );
        }

        private string EmptyToNull(string input)
        {
            if (String.IsNullOrWhiteSpace(input))
            {
                return null;
            }
            else
            {
                return input;
            }
        }

        private UserDTO CreateUserDTO(ApplicationUser user)
        {
            return new UserDTO
            {
                strFirstName = user.UserInfo.strFirstName.ToLower(),
                strLastName = user.UserInfo.strLastName.ToLower(),
                strToken = _tokenService.CreateToken(user),
                strUserName = user.UserName.ToLower(),
            };
        }
    }
}
