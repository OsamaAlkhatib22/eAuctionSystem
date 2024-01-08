using Application.Queries.Notification;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace API.Controllers
{
    public class NotificationController : BaseApiController
    {

        [HttpGet("NotificationList")] // .../api/Notification/NotificationList
        public async Task<IActionResult> GetNotificationList()
        {
            string authHeader = Request.Headers["Authorization"];
            JwtSecurityTokenHandler tokenHandler = new();
            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(authHeader[7..]);


            var UserName = jwtToken.Claims.First(c => c.Type == "username").Value;

            return HandleResult(await Mediator.Send(new GetNotificationsQuery(UserName)));
        }
    }
}
