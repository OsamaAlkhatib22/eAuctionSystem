using Microsoft.AspNetCore.Mvc;
using Application;
using Domain.DataModels.Tasks;
using Domain.ClientDTOs.User;
using System.IdentityModel.Tokens.Jwt;
using Domain.ClientDTOs.Complaint;
using Domain.ClientDTOs.Task;
using Microsoft.EntityFrameworkCore;

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

        [HttpPost("types")] // .../api/tasks/types
        public async Task<IActionResult> InsertTaskType([FromForm] TaskTypeDTO taskTypeDTO)
        {
            string authHeader = Request.Headers["Authorization"];
            JwtSecurityTokenHandler tokenHandler = new();
            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(authHeader[7..]);

            taskTypeDTO.strUserName = jwtToken.Claims.First(c => c.Type == "username").Value;

            return HandleResult(await Mediator.Send(new InsertTaskTypeCommand(taskTypeDTO)));
        }
        [HttpPost("{id}")] // .../api/tasks
        public async Task<IActionResult> InsertTaskStats([FromForm] TaskDTO taskDTO, int id) // Create task for selected complaint
        {
            string authHeader = Request.Headers["Authorization"];
            JwtSecurityTokenHandler tokenHandler = new();
            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(authHeader[7..]);

            taskDTO.strUserName = jwtToken.Claims.First(c => c.Type == "username").Value;

            return HandleResult(await Mediator.Send(new InsertTaskCommand(taskDTO, id)));
        }



    }
}
