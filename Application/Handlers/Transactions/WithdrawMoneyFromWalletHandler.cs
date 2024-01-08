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
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

public class WithdrawMoneyFromWalletHandler : IRequestHandler<WithdrawMoneyFromWalletCommand, Result<Transaction>>
{
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;
    private readonly UserManager<ApplicationUser> _userManager;

    public WithdrawMoneyFromWalletHandler(DataContext context, IConfiguration configuration, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _configuration = configuration;
        _userManager = userManager;
    }

    public async Task<Result<Transaction>> Handle(WithdrawMoneyFromWalletCommand request, CancellationToken cancellationToken)
    {
        using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
        try
        {
            var user = await _context.Users
                .Where(q => q.UserName == request.UserName)
                .Select(r => r.Id)
                .SingleOrDefaultAsync();

            if (user == 0) // Assuming UserId is of type int
            {
                Console.WriteLine($"User not found for username: {request.UserName}");
                return Result<Transaction>.Failure("User not found");
            }
            Console.WriteLine($"User found for username: {request.UserName}");

            
            var wallet = await _context.Wallets.FindAsync(user);

            if (wallet.Balance < request.Amount)
            {
                return Result<Transaction>.Failure("Insufficient balance");
            }

            Transaction newTran = new Transaction
            {
                TransactionDate = DateTime.UtcNow,
                Amount = request.Amount,
                UserId = user,
                TransactionType = "Reduction"
            };

            var TranEntity = await _context.Transactions.AddAsync(newTran);
            newTran.TransactionId = TranEntity.Entity.TransactionId;
            await _context.SaveChangesAsync(cancellationToken);

           
            _context.Wallets.Attach(wallet);
            wallet.Balance -= request.Amount;

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
