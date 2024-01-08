using Application.Core;
using Application.Queries.Service;
using Application.Queries.Transactions;
using Domain.ClientDTOs.Service;
using Domain.ClientDTOs.Transaction;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Task
{
    public class GetTransactionDetailsHandler
         : IRequestHandler<GetTransactionDetailsQuery, Result<TransactionDetailsDTO>>
    {

        private readonly DataContext _context;
        public GetTransactionDetailsHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<TransactionDetailsDTO>> Handle(
            GetTransactionDetailsQuery request,
            CancellationToken cancellationToken
        )
        {




            var query =
            from t in _context.Transactions
            where t.TransactionId == request.id && t.TransactionType == "Transfer"
            select new TransactionDetailsDTO
            {
                TransactionId= t.TransactionId,
                Amount= t.Amount,
                TransactionDate= t.TransactionDate,
                Transaction_Type= t.TransactionType,
                ClientUserName = _context.Users.Where(q => q.Id == t.UserId).Select(q => q.UserName).SingleOrDefault(),
                FreeLancerUserName = (from ts in _context.TransactionServices
                                      join b in _context.Bids
                                      on new { ts.TransactionId, ts.ServiceId } 
                                      equals new { t.TransactionId, ServiceId = b.ServiceId }
                                      join u in _context.Users
                                      on b.BidderId equals u.Id
                                      where ts.TransactionId == t.TransactionId && b.IsAccepted == true
                                      select u.UserName).SingleOrDefault(),
            };


            var result = await query.SingleOrDefaultAsync();


            return Result<TransactionDetailsDTO>.Success(result);


        }




    }

}