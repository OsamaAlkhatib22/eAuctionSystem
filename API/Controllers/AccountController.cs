using API.ClientDTOs;
using API.Services;
using Domain.DataModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Persistence;

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

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO login)
        {
            var user = await _userManager.FindByNameAsync(login.strLogin);
            if (user == null)
                return Unauthorized("User doesn't exist");

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
            return Unauthorized("Password is not correct");
        }
    }
}
