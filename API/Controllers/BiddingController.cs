using Application.Commands;
using Application.Queries.Bidding;
using Domain.ClientDTOs.Bidding;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace API.Controllers
{
    public class BiddingController : BaseApiController
    {
        [HttpGet("BidList/{id}")] // .../api/Bidding/BidList/1
        public async Task<IActionResult> GetBidList(int id)
        {
            return HandleResult(await Mediator.Send(new GetBidsListQuery(id)));
        }



        private readonly IMediator _mediator;

        public BiddingController(IMediator mediator)
        {
            _mediator = mediator;
        }

         [HttpPost("AddBid/{id}")]//  ../api/Bidding/AddBid/1    
        public async Task<IActionResult> AddBid( AddBidDTO addBidDTO, int id)
        {
            string authHeader = Request.Headers["Authorization"];
            JwtSecurityTokenHandler tokenHandler = new();
            JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(authHeader[7..]);

            addBidDTO.username = jwtToken.Claims.First(c => c.Type == "username").Value;

            return HandleResult(await _mediator.Send(new AddBidCommand(addBidDTO, id)));
        }

     

    }

}