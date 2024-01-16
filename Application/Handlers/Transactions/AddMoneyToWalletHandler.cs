using Application.Commands;
using Application.Core;
using Domain.ClientDTOs.Transaction;
using Domain.DataModels.Transactions;
using Domain.DataModels.Users;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Persistence;

public class AddMoneyToWalletHandler : IRequestHandler<AddMoneyToWalletCommand, Result<Transaction>>
{
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;
    private readonly UserManager<ApplicationUser> _userManager;

    public AddMoneyToWalletHandler(DataContext context, IConfiguration configuration, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _configuration = configuration;
        _userManager = userManager;
    }

    public async Task<Result<Transaction>> Handle(AddMoneyToWalletCommand request, CancellationToken cancellationToken)
    {
       

        using var transaction = await _context.Database.BeginTransactionAsync(
               cancellationToken
           );
        try
        {

            var user = await _context.Users.Where(q => q.UserName == request.UserName).Select(r => r.Id).SingleOrDefaultAsync();

            if (user == 0)
            {
                Console.WriteLine($"User not found for username: {request.UserName}");
                return Result<Transaction>.Failure("User not found");
            }
            Console.WriteLine($"User found for username: {request.UserName}");

            if (request.Amount < 1)
            {
                return Result<Transaction>.Failure("Amount must be 1$ or more.");
            }

            Transaction newTran = new Transaction
            {
                TransactionDate = DateTime.Now,
                Amount = request.Amount,
                UserId = user,
                TransactionType = "Addition"
             
            };


            
            var TranEntity = await _context.Transactions.AddAsync(newTran);
            newTran.TransactionId = TranEntity.Entity.TransactionId;
            await _context.SaveChangesAsync(cancellationToken);

            //walet shit here check if correct
            var wallet = await _context.Wallets.FindAsync(user);
             _context.Wallets.Attach(wallet);
            
            wallet.Balance += request.Amount;


            await _context.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync();
            return Result<Transaction>.Success(newTran);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return Result<Transaction>.Failure(ex.Message);
        }
    }
}
