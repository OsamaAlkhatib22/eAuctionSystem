
using Application.Core;
using Application.Queries.Transactions;
using Domain.ClientDTOs.Transaction;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Transaction
{
    public class GetWalletUserHandler
         : IRequestHandler<GetWalletUserQuery, Result<WalletDTO>>
    {

        private readonly DataContext _context;
        public GetWalletUserHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<WalletDTO>> Handle(
            GetWalletUserQuery request,
            CancellationToken cancellationToken
        )
        {
            int userid = await _context.Users.Where(t => t.UserName == request.username).Select(q => q.Id).SingleOrDefaultAsync();

            var query =
            from t in _context.Wallets
            where t.UserId == userid
            select new WalletDTO
            {

                Balance = t.Balance,

            };


            var result = await query.SingleOrDefaultAsync();


            return Result<WalletDTO>.Success(result);


        }




    }

}