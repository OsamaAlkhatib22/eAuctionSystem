using Microsoft.AspNetCore.Mvc;
using Application.Queries.Transaction;

namespace API.Controllers
{
    public class TransactionController : BaseApiController
    {
        [HttpGet("Tran")] // .../api/Transaction/Tran
        public async Task<IActionResult> GetTransactionList()
        {
            return HandleResult(await Mediator.Send(new GetTransactionsListQuery()));
        }



    }
}