using Microsoft.AspNetCore.Mvc;
using Application.Queries.Transaction;
using Application.Commands;
using Domain.ClientDTOs.Bidding;
using Org.BouncyCastle.Asn1.Ocsp;
using System.IdentityModel.Tokens.Jwt;
using Domain.ClientDTOs.Transaction;

namespace API.Controllers
{
    public class TransactionController : BaseApiController
    {
        [HttpGet("Tran")] // .../api/Transaction/Tran
        public async Task<IActionResult> GetTransactionList()
        {
            string authHeader = Request.Headers["Authorization"];
            JwtSecurityTokenHandler tokenHandler = new();
            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(authHeader[7..]);


            var UserName = jwtToken.Claims.First(c => c.Type == "username").Value;

            return HandleResult(await Mediator.Send(new GetTransactionsListQuery(UserName)));
        }

        [HttpPost("Add")] // .../api/Transaction/Add
        public async Task<IActionResult> AddMoneyToWallet( decimal Amount)
        {
            string authHeader = Request.Headers["Authorization"];
            JwtSecurityTokenHandler tokenHandler = new();
            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(authHeader[7..]);
            

           var UserName = jwtToken.Claims.First(c => c.Type == "username").Value;
            

            return HandleResult(await Mediator.Send(new AddMoneyToWalletCommand(Amount, UserName)));
        }

        [HttpPost("Subtract")] // .../api/Transaction/Subtract
        public async Task<IActionResult> WithdrawMoneyFromWallet( decimal Amount)
        {
            string authHeader = Request.Headers["Authorization"];
            JwtSecurityTokenHandler tokenHandler = new();
            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(authHeader[7..]);

            var UserName = jwtToken.Claims.First(c => c.Type == "username").Value;

            return HandleResult(await Mediator.Send(new WithdrawMoneyFromWalletCommand(Amount, UserName)));
        }





    }
}


