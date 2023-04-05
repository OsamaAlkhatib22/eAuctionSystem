using Application.Core;
using Domain.ClientDTOs.Complaint;
using Domain.DataModels.Complaints;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers
{
    public class GetComplaintsListHandler
          : IRequestHandler<GetComplaintsListQuery, Result<List<ComplaintListDTO>>>
    {
        private readonly DataContext _context;

        public GetComplaintsListHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<List<ComplaintListDTO>>> Handle(
            GetComplaintsListQuery request,
            CancellationToken cancellationToken
        )
        {
            List<ComplaintListDTO> result = await _context.Complaints
     .Join(
         _context.Users,
         c => c.intUserID,
         u => u.Id,
         (c, u) => new { Complaint = c, User = u }
          )
     .Join(
         _context.ComplaintTypes,
         c => c.Complaint.intTypeId,
         ct => ct.intId,
            (c, ct) => new ComplaintListDTO
               {
                intComplaintId = c.Complaint.intId,
                strUserName = c.User.UserName,
                dtmDateCreated = c.Complaint.dtmDateCreated,
                strComplaintTypeEn = ct.strNameEn,
                strComplaintTypeAr= ct.strNameAr
               }
            )
         .ToListAsync();


            return Result<List<ComplaintListDTO>>.Success(result);
        }
    }
}
