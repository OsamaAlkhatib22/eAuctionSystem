using Microsoft.AspNetCore.Mvc;
using Application.Queries.Service;
using MediatR;
using Application.Commands;
using System.IdentityModel.Tokens.Jwt;
using Domain.ClientDTOs.Service;

namespace API.Controllers
{
    public class TaskController : BaseApiController
    {
        [HttpGet("TaskList")] // .../api/Task/TaskList
        public async Task<IActionResult> GetTaskList()
        {
            string authHeader = Request.Headers["Authorization"];
            JwtSecurityTokenHandler tokenHandler = new();
            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(authHeader[7..]);


            var UserName = jwtToken.Claims.First(c => c.Type == "username").Value;

            return HandleResult(await Mediator.Send(new GetServiceListQuery(UserName)));
        }


        [HttpGet("CompletedTaskList")] // .../api/Task/CompletedTaskList
        public async Task<IActionResult> CompletedTaskList()
        {
            string authHeader = Request.Headers["Authorization"];
            JwtSecurityTokenHandler tokenHandler = new();
            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(authHeader[7..]);


            var UserName = jwtToken.Claims.First(c => c.Type == "username").Value;

            return HandleResult(await Mediator.Send(new GetCompletedTaskListQuery(UserName)));
        }



        [HttpGet("TaskDetails/{id}")] // .../api/Task/TaskDetails/1
        public async Task<IActionResult> GetTaskDetails(int id)
        {
            return HandleResult(await Mediator.Send(new GetTaskDetailsQuery(id)));
        }

        private readonly IMediator _mediator;

        public TaskController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPost("CreateTask")] // .../api/Task/CreateTask
        public async Task<IActionResult> CreateTask([FromForm] CreateTaskUserDTO CreateTaskUserDTO)
        {
            string authHeader = Request.Headers["Authorization"];
            JwtSecurityTokenHandler tokenHandler = new();
            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(authHeader[7..]);


            CreateTaskUserDTO.UserName = jwtToken.Claims.First(c => c.Type == "username").Value;

            return HandleResult(await Mediator.Send(new CreateTaskUserCommand(CreateTaskUserDTO)));
        }

    }
}