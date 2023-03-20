using API.ClientDTOs;
using API.Services;
using Domain.DataModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            var user = await _userManager.FindByNameAsync(login.strLogin);
            if (user == null)
                return Unauthorized("User doesn't exist.");

            var result = await _userManager.CheckPasswordAsync(user, login.strPassword);
            if (result)
            {
                user.UserInfo = await _context.UserInfos.FindAsync(user.intUserType);
                return new UserDTO
                {
                    strFirstName = user.UserInfo.strFirstName,
                    strLastName = user.UserInfo.strLastName,
                    strToken = _tokenService.CreateToken(user),
                    strUserName = user.UserName
                };
            }
            return Unauthorized("Password is not correct.");
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO register)
        {
            // Duplicate validation
            if (await _userManager.Users.AnyAsync(q => q.Email == register.strEmail))
            {
                return BadRequest("Email is already used.");
            }

            if (await _userManager.Users.AllAsync(q => q.UserName == register.strUsername))
            {
                return BadRequest("Username is already used.");
            }

            if (await _userManager.Users.AllAsync(q => q.PhoneNumber == register.strPhonenumber))
            {
                return BadRequest("Phonenumber is already used.");
            }

            if (
                await _context.UserInfos
                    .Where(q => q.strNationalId == register.strNationalId)
                    .FirstOrDefaultAsync() != null
            )
            {
                return BadRequest("National ID is already used.");
            }

            if (
                await _context.UserInfos
                    .Where(q => q.strNationalIdNumber == register.strNationalIdNumber)
                    .FirstOrDefaultAsync() != null
            )
            {
                return BadRequest("ID number is already used.");
            }

            if (
                await _context.UserInfos
                    .Where(q => q.strRegistrationNumber == register.strRegistrationNumber)
                    .FirstOrDefaultAsync() != null
            )
            {
                return BadRequest("Registration number is already used.");
            }

            if (
                await _context.UserInfos
                    .Where(q => q.strPassportNumber == register.strPassportNumber)
                    .FirstOrDefaultAsync() != null
            )
            {
                return BadRequest("Passport number is already used.");
            }
            ///

            // Null validation

            ///

            var userInfo = await _context.UserInfos.AddAsync(
                new UserInfo
                {
                    strFirstName = register.strFirstName,
                    strLastName = register.strLastName,
                    strNationalId = register.strNationalId,
                    strNationalIdNumber = register.strNationalIdNumber
                }
            );
            await _context.SaveChangesAsync();

            ApplicationUser user = new ApplicationUser
            {
                UserName = register.strUsername,
                Email = register.strEmail,
                PhoneNumber = register.strPhonenumber,
                intUserType = 3,
                intUserInfo = userInfo.Entity.intId,
                UserInfo = userInfo.Entity
            };

            var result = await _userManager.CreateAsync(user, register.strPassword);

            if (result.Succeeded)
            {
                return new UserDTO
                {
                    strFirstName = user.UserInfo.strFirstName,
                    strLastName = user.UserInfo.strLastName,
                    strToken = _tokenService.CreateToken(user),
                    strUserName = user.UserName
                };
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetActiveUser()
        {
            var user = await _userManager.FindByNameAsync(User.FindFirstValue(ClaimTypes.Name));
            user.UserInfo = await _context.UserInfos.FindAsync(user.intUserInfo);

            return new UserDTO
            {
                strFirstName = user.UserInfo.strFirstName,
                strLastName = user.UserInfo.strLastName,
                strToken = _tokenService.CreateToken(user),
                strUserName = user.UserName
            };
        }
    }
}
