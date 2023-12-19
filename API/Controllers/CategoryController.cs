    using Microsoft.AspNetCore.Mvc;
    using Application.Queries.Category;

    namespace API.Controllers
    {
        public class CategoryController : BaseApiController
        {
            [HttpGet("List")] // .../api/Category/List
            public async Task<IActionResult> GetCategoryList()
            {
                return HandleResult(await Mediator.Send(new GetCategoryListQuery()));
            }

        

        }
    }