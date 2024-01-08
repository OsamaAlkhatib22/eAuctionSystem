using Application.Commands;
using Application.Core;
using Application.Handlers.Notification;
using Domain.ClientDTOs.Bidding;
using Domain.ClientDTOs.Notification;
using Domain.DataModels.Notifications;
using Domain.DataModels.Services;
using Domain.DataModels.Users;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Persistence;

public class InsertBidHandler : IRequestHandler<AddBidCommand, Result<AddBidDTO>>
{
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;
    public readonly UserManager<ApplicationUser> _userManager;
    public readonly NotificationHandler _notificationHandler;


    public InsertBidHandler(
            DataContext context,
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager,
            NotificationHandler notificationHandler
        )
    {
        _context = context;
        _configuration = configuration;
        _userManager = userManager;
        _notificationHandler = notificationHandler;

        
    }

 

    public async Task<Result<AddBidDTO>> Handle(AddBidCommand request, CancellationToken cancellationToken)
    {
        using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);
        try
        {
            if (request.AddBidDTO.Bid_Amount <= 0)
            {
                await transaction.RollbackAsync();
                return Result<AddBidDTO>.Failure("Bid amount must be more than Zero.");
            }


            var service = await _context.Services.FindAsync(request.id);

            if (service == null)
            {
                await transaction.RollbackAsync();
                return Result<AddBidDTO>.Failure("Service not found.");
            }

            //the one who makes the bid
            int UserId = await _context.Users.Where(q => q.UserName == request.AddBidDTO.username).Select(q => q.Id).SingleOrDefaultAsync();
           

            // Check if the same bidder has placed a previous bid
            var previousBid = await _context.Bids.Where(b => b.ServiceId == request.id && b.BidderId == UserId)
                                                 .OrderBy(b => b.BidAmount).FirstOrDefaultAsync();

            if (previousBid != null && previousBid.BidAmount <= request.AddBidDTO.Bid_Amount)
            {
                await transaction.RollbackAsync();
                return Result<AddBidDTO>.Failure("Bid amount must be lower than the previous bid.");
            }



            // Check if bid duration has expired
            DateTime bidExpiration = service.CreationDate.Add(service.BidDuration);
            if (DateTime.UtcNow > bidExpiration)
            {
                await transaction.RollbackAsync();
                return Result<AddBidDTO>.Failure("Bid duration has expired. No more bids can be placed.");
            }

            if (service.starting_bid < request.AddBidDTO.Bid_Amount)
            {
                await transaction.RollbackAsync();
                return Result<AddBidDTO>.Failure("Bid Amount cant be higher then the service budget.");
            }


            Bids newBid = new Bids
            {
                BidderId = UserId,
                BidAmount = request.AddBidDTO.Bid_Amount,
                ServiceId = request.id,// to Assign the spicfic serviceID to the bid
                UserId = _context.Services.Where(q => q.ServiceId == request.id).Select(q => q.UserId).FirstOrDefault(),
                IsAccepted = false,


              
            };


            await _context.Bids.AddAsync(newBid);
            await _context.SaveChangesAsync(cancellationToken);

            await _notificationHandler.Handle(new NotificationCommand(
                new NotificationDTO
                {
                    UserId = _context.Services.Where(q => q.ServiceId == request.id).Select(q => q.UserId).FirstOrDefault(),
                    Notification = $"New bid placed for your service (Service Number: {request.id}).",
                    NotificationDate = DateTime.UtcNow,
                }

                ), cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);
            await transaction.CommitAsync();


            return Result<AddBidDTO>.Success(request.AddBidDTO);
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            Console.WriteLine($"An error occurred: {ex.Message}");
            Console.WriteLine($"Stack Trace: {ex.StackTrace}");
            Console.WriteLine($"Inner Exception: {ex.InnerException?.Message}");
            return Result<AddBidDTO>.Failure($"An error occurred: {ex.Message}");
        }
    }

}
