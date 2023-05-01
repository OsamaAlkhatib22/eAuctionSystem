using Microsoft.AspNetCore.Mvc;
using Application;
using System.IdentityModel.Tokens.Jwt;
using Domain.ClientDTOs.Evaluation;

namespace API.Controllers
{
    public class EvaluationsController : BaseApiController
    {
        [HttpPost("{id}")] // .../api/evaluations/...
        public async Task<IActionResult> CompleteTask(EvaluationDTO completedDTO, int id )// Evaluate selected task as completed
        {
            string authHeader = Request.Headers["Authorization"];
            JwtSecurityTokenHandler tokenHandler = new();
            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(authHeader[7..]);

            completedDTO.strUserName = jwtToken.Claims.First(c => c.Type == "username").Value;
            return HandleResult(await Mediator.Send(new CompleteTaskCommand(completedDTO, id)));
        }


    }
}
