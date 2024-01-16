using Application.Core;
using Application.Queries.Service;
using Domain.ClientDTOs.Service;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Task
{
    public class GetCompletedTaskDetialsHandler
         : IRequestHandler<GetCompletedTaskDetialsQuery, Result<CompletedTaskDetialsDTO>>
    {

        private readonly DataContext _context;
        public GetCompletedTaskDetialsHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<CompletedTaskDetialsDTO>> Handle(
            GetCompletedTaskDetialsQuery request,
            CancellationToken cancellationToken
        )
        {




            var query =
            from t in _context.Services
            where t.ServiceId == request.id && t.status == "Completed"
            select new CompletedTaskDetialsDTO
            {
                ServiceId = t.ServiceId,
                Title = t.Title,
                FirstName = _context.Users.Where(q => q.Id == t.UserId).Select(q => q.FirstName).SingleOrDefault(),
                LastName = _context.Users.Where(q => q.Id == t.UserId).Select(q => q.LastName).SingleOrDefault(),
                Accepted_Bid = _context.Bids.Where(q => q.ServiceId == t.ServiceId && q.IsAccepted == true).Select(w => w.BidAmount).SingleOrDefault(),
                FreeLancerUserName = _context.Users
                                    .Where(u => u.Id == _context.Bids
                                    .Where(b => b.ServiceId == t.ServiceId && b.IsAccepted == true)
                                    .Select(b => b.BidderId)
                                    .SingleOrDefault())
                                    .Select(u => u.UserName)
                                    .SingleOrDefault(),
                CreationDate = t.CreationDate,
                Description = t.Description,
                Category_name = t.Category.strCategoryName,
                Rating = _context.UserRatings.Where(q => q.UserId == t.UserId).Select(r => r.Rating).SingleOrDefault(),
                status = t.status,
                Skills = _context.TaskSkills.Where(q => q.ServiceId == t.ServiceId).Select(w => w.Skills.Skill).ToList(),
                lstMedia = _context.TaskAttachments
                    .Where(q => q.ServiceId == t.ServiceId && q.FromFreeLancer == false)
                    .Select(s => File.Exists(s.MediaRef) ? Convert.ToBase64String(File.ReadAllBytes(s.MediaRef)) : string.Empty).ToList(),
                TaskSubmissionTime = t.TaskSubmissionTime,


                //freelancer things 
                freeLancerComment = _context.TaskAttachments.
                Where(q => q.ServiceId == t.ServiceId && q.FromFreeLancer ==true).
                Select(e => e.Comment).SingleOrDefault(),
                freeLancerSubmittedlstMedia = _context.TaskAttachments
                .Where(q => q.ServiceId == t.ServiceId && q.FromFreeLancer == true)
                .Select(s => File.Exists(s.MediaRef) ? Convert.ToBase64String(File.ReadAllBytes(s.MediaRef)) : string.Empty).ToList(),


            };


            var result = await query.SingleOrDefaultAsync();


            return Result<CompletedTaskDetialsDTO>.Success(result);


        }




    }

}