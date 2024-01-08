using Application.Core;
using Application.Queries.Bidding;
using Application.Queries.Transaction;
using Domain.ClientDTOs.Bidding;
using Domain.ClientDTOs.Transaction;
using Domain.ClientDTOs.User;
using Domain.DataModels.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Bidding
{


    public class GetBidsListHandler
    : IRequestHandler<GetBidsListQuery, Result<List<BidDTO>>>
    {
        private readonly DataContext _context;
        public GetBidsListHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<List<BidDTO>>> Handle(
            GetBidsListQuery request,
            CancellationToken cancellationToken
        )
        {
            var query =
                from t in _context.Bids
                where t.ServiceId == request.id
                select new BidDTO
                {
                    
                    BidId = t.BidId,
                    BidAmount = t.BidAmount,
                    Bidder = _context.Users.Where(q => q.Id == t.BidderId).Select(q => new PublicUserInfoBidDTO
                    {
                        FirstName = q.FirstName,
                        LastName = q.LastName,
                        UserName = q.UserName,
                        Rating = q.Ratings.Where(r => r.UserId == q.Id).Select(r => r.Rating).FirstOrDefault(),
                        BidderId = q.Id,
                        
                        
                        
                    }).FirstOrDefault()
                    


                };

            var result = await query.ToListAsync();


            return Result<List<BidDTO>>.Success(result);


        }
    }



}