using Microsoft.AspNetCore.Mvc;
using Application.Queries.Category;
using Application.Queries.Review;

namespace API.Controllers
{
    public class ReviewController : BaseApiController
    {
        [HttpGet("Rev")] // .../api/Review/Rev
        public async Task<IActionResult> GetReviewList()
        {
            return HandleResult(await Mediator.Send(new GetReviewListQuery()));
        }



    }
}