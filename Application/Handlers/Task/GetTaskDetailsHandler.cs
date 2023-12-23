using Application.Core;
using Application.Queries.Service;
using Domain.ClientDTOs.Service;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Task
{
    public class GetTaskDetailsHandler
         : IRequestHandler<GetTaskDetailsQuery, Result<ServiceDTO>>
    {

        private readonly DataContext _context;
        public GetTaskDetailsHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<ServiceDTO>> Handle(
            GetTaskDetailsQuery request,
            CancellationToken cancellationToken
        )
        {
            var query =
            from t in _context.Services
            where t.ServiceId == request.id
            select new ServiceDTO
            {

                Title = t.Title,
                FirstName = _context.Users.Where(q => q.Id == t.UserId).Select(q => q.FirstName).SingleOrDefault(),
                LastName = _context.Users.Where(q => q.Id == t.UserId).Select(q => q.LastName).SingleOrDefault(),
                ServiceId = t.ServiceId,
                BidDuration = t.BidDuration,
                starting_bid = t.starting_bid,
                CreationDate = t.CreationDate,
                Description = t.Description,
                Category_name = t.Category.strCategoryName,
                Rating = _context.UserRatings.Where(q => q.UserId == t.UserId).Select(r => r.Rating).SingleOrDefault(),
                lstMedia = _context.TaskAttachments
                    .Where(q => q.ServiceId == t.ServiceId)
                    .Select(s => File.Exists(s.MediaRef)? Convert.ToBase64String(File.ReadAllBytes(s.MediaRef)):string.Empty).ToList(),
                
            };


            var result = await query.SingleOrDefaultAsync();


            return Result<ServiceDTO>.Success(result);


        }




    }

}