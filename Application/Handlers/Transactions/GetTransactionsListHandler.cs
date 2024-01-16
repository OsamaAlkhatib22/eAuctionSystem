
using Application.Core;
using Application.Queries.Transaction;
using Domain.ClientDTOs.Service;
using Domain.ClientDTOs.Transaction;
using Domain.DataModels.Services;
using Domain.Resources;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using ZstdNet;

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
            int userid = await _context.Users.Where(t => t.UserName == request.username).Select(q => q.Id).SingleOrDefaultAsync();

            var query =
            from t in _context.Transactions
            where t.UserId == userid
            select new TransactionDTO
            {

                TransactionId = t.TransactionId,
                TransactionDate = t.TransactionDate,
                Amount = t.Amount,
                //UserId = _context.Users.Where(q => q.Id == t.UserId).Select(w => w.Id).SingleOrDefault(),
                UserId = t.UserId,
                Transaction_Type = t.TransactionType,
               ServiceId = _context.TransactionServices.Where(q => q.TransactionId == t.TransactionId).Select(s => s.ServiceId).SingleOrDefault(),
            

            };


            var result = await query.ToListAsync();


            return Result<List<TransactionDTO>>.Success(result);


        }




    }

}