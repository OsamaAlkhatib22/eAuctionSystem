using Microsoft.AspNetCore.Mvc;
using Application;
using System.IdentityModel.Tokens.Jwt;
using Domain.ClientDTOs.Evaluation;

namespace API.Controllers
{
    public class EvaluationsController : BaseApiController
    {
        [HttpPost("complete/{id}")] // .../api/evaluations/complete/...
        public async Task<IActionResult> CompleteTask(EvaluationDTO completedDTO, int id )// Evaluate selected task as completed
        {
            string authHeader = Request.Headers["Authorization"];
            JwtSecurityTokenHandler tokenHandler = new();
            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(authHeader[7..]);

            completedDTO.strUserName = jwtToken.Claims.First(c => c.Type == "username").Value;
            return HandleResult(await Mediator.Send(new CompleteTaskCommand(completedDTO, id)));
        }
        [HttpPost("fail/{id}")] // .../api/evaluations/fail/...
        public async Task<IActionResult> FailTask(EvaluationDTO failedDTO, int id)// Evaluate selected task as failed
        {
            string authHeader = Request.Headers["Authorization"];
            JwtSecurityTokenHandler tokenHandler = new();
            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(authHeader[7..]);

            failedDTO.strUserName = jwtToken.Claims.First(c => c.Type == "username").Value;
            return HandleResult(await Mediator.Send(new FailTaskCommand(failedDTO, id)));
        }


    }
}
