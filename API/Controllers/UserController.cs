using Microsoft.AspNetCore.Mvc;
using Application.Queries.Transaction;
using Application.Queries.User;

namespace API.Controllers
{
   
    public class UserController : BaseApiController
    {
        [HttpGet("Userlist")] // .../api/User/Userlist
        public async Task<IActionResult> GetUserList()
        {
            return HandleResult(await Mediator.Send(new GetUsersListQuery()));
        }



    }
}