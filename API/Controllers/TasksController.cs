using Microsoft.AspNetCore.Mvc;
using Application;
using Domain.DataModels.Tasks;
using Domain.ClientDTOs.User;
using System.IdentityModel.Tokens.Jwt;

namespace API.Controllers
{
    public class TasksController : BaseApiController
    {
        [HttpGet] // .../api/tasks
        public async Task<IActionResult> GetTasksList()
        {
            return HandleResult(await Mediator.Send(new GetTasksListQuery()));
        }

        [HttpGet("users")] // .../api/tasks/users
        public async Task<IActionResult> GetWorkersList()
        {
            return HandleResult(await Mediator.Send(new GetWorkersListQuery()));
        }

    }
}
