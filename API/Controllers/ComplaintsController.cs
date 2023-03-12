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
        public async Task<ActionResult<List<Complaint>>> GetComplaints()
        {
            return await Mediator.Send(new GetComplaintsList.Query());
        }

        [HttpGet("{id}")] // .../api/activities/44531BAE-4B45-4FCC-BF2F-565DFFB9EA81
        public async Task<ActionResult<Complaint>> GetComplaint(int id)
        {
            return await Mediator.Send(new GetComplaint.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateComplaint(Complaint complaint)
        {
            await Mediator.Send(new AddComplaint.Command { Complaint = complaint});
            return Ok();
        }

    }
}
