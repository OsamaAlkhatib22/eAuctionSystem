using System;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Application.Commands;
using Application.Core;
using Domain.ClientDTOs.Bidding;
using Domain.ClientDTOs.Transaction;
using Domain.DataModels.Transactions;
using Domain.DataModels.Users;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Persistence;

public class AcceptedBidHandler : IRequestHandler<AcceptedBidCommand, Result<Transaction>>
{
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;
    private readonly UserManager<ApplicationUser> _userManager;

    public AcceptedBidHandler(DataContext context, IConfiguration configuration, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _configuration = configuration;
        _userManager = userManager;
    }

    public async Task<Result<Transaction>> Handle(AcceptedBidCommand request, CancellationToken cancellationToken)
    {
        using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

        try
        {
            var ServiceId =await _context.Bids.Where(q=> q.BidId == request.Bidid).Select(r => r.ServiceId).SingleOrDefaultAsync();
            var bid = await _context.Bids.FindAsync(request.Bidid);

            var receiver = bid.BidderId;

            var bidId = request.Bidid;
            var user = await _context.Users.Where(q => q.UserName == request.UserName).Select(r => r.Id).SingleOrDefaultAsync();//the client who selects which bid
            var ServiceAcceptedBidCount = await _context.Bids.Where(q => q.ServiceId == ServiceId && q.IsAccepted == true).CountAsync(); 
            
            if (receiver == 0)
            {
               
                return Result<Transaction>.Failure("receiver not found");
            }
            if (ServiceAcceptedBidCount  > 0)
            {
                return Result<Transaction>.Failure("A bid has Already been accepted you cant accept more then one bid.");
            }

            var senderWallet = await _context.Wallets.FindAsync(user);
            if (senderWallet.Balance < bid.BidAmount)
            {
                Console.WriteLine($"Insufficient balance. User: {request.UserName}, Balance: {senderWallet.Balance}");
                return Result<Transaction>.Failure("Insufficient balance");
            }
            Transaction newTran = new Transaction
            {
                TransactionDate = DateTime.UtcNow,
                Amount = bid.BidAmount,
                UserId = user,
                TransactionType = "Transfer",
            };

          
            await _context.SaveChangesAsync(cancellationToken);
         
            var TranEntity = await _context.Transactions.AddAsync(newTran);
            newTran.TransactionId = TranEntity.Entity.TransactionId;
            await _context.SaveChangesAsync(cancellationToken);

         
            _context.Wallets.Attach(senderWallet);
            senderWallet.Balance -= bid.BidAmount;

            var receiverWallet = await _context.Wallets.FindAsync(receiver);
            _context.Wallets.Attach(receiverWallet);
            receiverWallet.Balance += bid.BidAmount;

            var bidEntity = await _context.Bids.FindAsync(bidId);
            _context.Bids.Attach(bidEntity);
            bidEntity.IsAccepted = true;

            var service = await _context.Services.FindAsync(ServiceId);
            _context.Services.Attach(service);
            service.status = "In Process"; //freelancer working on task


            


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
