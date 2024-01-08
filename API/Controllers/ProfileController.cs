using Application.Queries.Profile;
using Application.Queries.Service;
using Application.Queries.User;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace API.Controllers
{
    public class ProfileController : BaseApiController
    {
        [HttpGet("PublicInfo")] // .../api/Profile/PublicInfo
        public async Task<IActionResult> GetPublicProfileInfoList()
        {
            string authHeader = HttpContext.Request.Headers["Authorization"];
            JwtSecurityTokenHandler tokenHandler = new();
                JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(authHeader[7..]);
            string UserName = jwtToken.Claims.First(c => c.Type == "username").Value;

            return HandleResult(await Mediator.Send(new GetUserPublicInfoQuery(UserName)));
        }
       

        [HttpGet("SelectedProfileInfo/{username}")] // .../api/Profile/SelectedProfileInfo/ahmad_sa
        public async Task<IActionResult> GetPrivateProfileInfoList(string UserName)
        {
           
            return HandleResult(await Mediator.Send(new GetSelectedProfileInfoQuery(UserName)));
        }



    }
}
