using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Persistence;
using MediatR;
using Application;

namespace API.Controllers
{
    public class ComplaintsController : BaseApiController
    {
        [HttpGet] // .../api/complaints
        public async Task<ActionResult<List<Complaint>>> GetComplaintsList()
        {
            return await Mediator.Send(new GetComplaintsListQuery());
        }

        [HttpGet("{id}")] // .../api/complaints/...
        public async Task<ActionResult<Complaint>> GetComplaintById(int id)
        {
            return await Mediator.Send(new GetComplaintByIdQuery(id));
        }

        [HttpPost] // .../api/complaints
        public async Task<IActionResult> InsertComplaint([FromBody] Complaint complaint)
        {
            return Ok(await Mediator.Send(new InsertComplaintCommand(complaint)));
        }
    }
}
