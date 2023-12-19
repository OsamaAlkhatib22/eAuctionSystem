
using Application.Core;
using Application.Queries.Transaction;
using Domain.ClientDTOs.Service;
using Domain.ClientDTOs.Transaction;
using Domain.DataModels.Services;
using Domain.Resources;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Transaction
{
    public class GetTransactionsListHandler
         : IRequestHandler<GetTransactionsListQuery, Result<List<TransactionDTO>>>
    {   

        private readonly DataContext _context;
        public GetTransactionsListHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<List<TransactionDTO>>> Handle(
            GetTransactionsListQuery request,
            CancellationToken cancellationToken
        )
        {
            var query =
            from t in _context.Transactions
            select new TransactionDTO
            {

                TransactionId = t.TransactionId,
                TransactionDate = t.TransactionDate,
                Amount = t.Amount,
                Bidder = _context.Users.Where(q => q.Id == t.BidderId)
                .Select(q => new BidderDTO {
                    FirstName = q.FirstName,
                    LastName = q.LastName,
                    BidderId = t.BidderId
                }).FirstOrDefault(),
                Buyer = _context.Users.Where(q => q.Id == t.BuyerId)
                .Select(q => new BuyerDTO
                {
                    FirstName = q.FirstName,
                    LastName = q.LastName,
                    BuyerID = t.BuyerId
                }).FirstOrDefault(),
                Service = _context.Services.Where(q => q.ServiceId == t.ServiceId)
                .Select(q => new ServiceDTO { 
                    ServiceId = q.ServiceId,
                    //Budget = q.Budget,
                    starting_bid = q.starting_bid,
                    BidDuration = q.BidDuration,
                    Category_name = CategoriesConstant.GetCategoryName(q.CategoryId),
                    CreationDate = q.CreationDate,
                    Description = q.Description,
                    Title = q.Title,
                    Rating = q.User.Ratings.Where(f => f.UserId == q.UserId).Select(f => f.Rating).FirstOrDefault()
                    
                }).FirstOrDefault()

            };


            var result = await query.ToListAsync();


            return Result<List<TransactionDTO>>.Success(result);


        }




    }

}