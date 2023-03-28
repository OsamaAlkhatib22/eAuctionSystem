using Microsoft.AspNetCore.Mvc;
using Application;
using Domain.ClientDTOs;
using Domain.DataModels.Complaints;

namespace API.Controllers
{
    public class ComplaintsController : BaseApiController
    {
        [HttpGet] // .../api/complaints
        public async Task<IActionResult> GetComplaintsList()
        {
            return HandleResult(await Mediator.Send(new GetComplaintsListQuery()));
        }

        [HttpGet("{id}")] // .../api/complaints/...
        public async Task<ActionResult<Complaint>> GetComplaintById(int id)
        {
            return HandleResult(await Mediator.Send(new GetComplaintByIdQuery(id)));
        }

        [HttpPost] // .../api/complaints
        public async Task<IActionResult> InsertComplaint([FromBody] Complaint complaint)
        {
            return Ok(await Mediator.Send(new InsertComplaintCommand(complaint)));
        }

        [HttpGet("user/{userId}")] // .../api/complaints/user/..
        public async Task<ActionResult<UserDTO>> GetComplaintByUserId(int userId)
        {
            return HandleResult(await Mediator.Send(new GetComplaintByUserIdQuery(userId)));
        }
    }
}
