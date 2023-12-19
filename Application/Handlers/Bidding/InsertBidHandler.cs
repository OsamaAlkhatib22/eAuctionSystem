using Application.Commands;
using Application.Core;
using Domain.ClientDTOs.Bidding;
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


    public InsertBidHandler(
            DataContext context,
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager
        )
    {
        _context = context;
        _configuration = configuration;
        _userManager = userManager;


        
    }

 

    public async Task<Result<AddBidDTO>> Handle(AddBidCommand request, CancellationToken cancellationToken)
    {
        try
        {
            
            var service = await _context.Services.FindAsync(request.id);

            if (service == null)
            {
                return Result<AddBidDTO>.Failure("Service not found.");
            }

            //the one who makes the bid
            int UserId = await _context.Users.Where(q => q.UserName == request.AddBidDTO.username).Select(q => q.Id).SingleOrDefaultAsync();
           

            // Check if the same bidder has placed a previous bid
            var previousBid = await _context.Bids.Where(b => b.ServiceId == request.id && b.BidderId == UserId)
                                                 .OrderByDescending(b => b.BidAmount).FirstOrDefaultAsync();

            if (previousBid != null && previousBid.BidAmount <= request.AddBidDTO.Bid_Amount)
            {
                return Result<AddBidDTO>.Failure("Bid amount must be lower than the previous bid.");
            }

            // Check if bid duration has expired
            DateTime bidExpiration = service.CreationDate.Add(service.BidDuration);
            if (DateTime.UtcNow > bidExpiration)
            {
                return Result<AddBidDTO>.Failure("Bid duration has expired. No more bids can be placed.");
            }


            Bids newBid = new Bids
            {
                BidderId = UserId,
                BidAmount = request.AddBidDTO.Bid_Amount,
                ServiceId = request.id,// to Assign the spicfic service ID to the bid
                UserId = _context.Services.Where(q => q.ServiceId == request.id).Select(q => q.UserId).FirstOrDefault(),



              
            };


            await _context.Bids.AddAsync(newBid);
            await _context.SaveChangesAsync(cancellationToken);

            return Result<AddBidDTO>.Success(request.AddBidDTO);
        }
        catch (Exception ex)
        {
            return Result<AddBidDTO>.Failure($"An error occurred: {ex.Message}");
        }
    }

}
