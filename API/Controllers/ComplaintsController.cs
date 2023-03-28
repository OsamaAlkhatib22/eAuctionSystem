using Microsoft.AspNetCore.Mvc;
using Application;
using Domain.DataModels.Complaints;
using Domain.ClientDTOs.User;
using Domain.ClientDTOs.Complaint;

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
        public async Task<IActionResult> InsertComplaint([FromForm] ComplaintDTO complaintDTO)
        {
            return Ok(await Mediator.Send(new InsertComplaintCommand(complaintDTO)));
        }

        [HttpGet("user/{userId}")] // .../api/complaints/user/..
        public async Task<ActionResult<UserDTO>> GetComplaintByUserId(int userId)
        {
            return HandleResult(await Mediator.Send(new GetComplaintByUserIdQuery(userId)));
        }
    }
}
