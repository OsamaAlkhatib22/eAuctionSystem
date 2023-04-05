using Application.Core;
using Domain.ClientDTOs.Complaint;
using Domain.DataModels.Complaints;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers
{
    public class GetComplaintByIdHandler : IRequestHandler<GetComplaintByIdQuery, Result<ComplaintViewDTO>>
    {
        private readonly DataContext _context;

        public GetComplaintByIdHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<ComplaintViewDTO>> Handle(
        GetComplaintByIdQuery request,
        CancellationToken cancellationToken
    )
        {
            var result = await _context.Complaints
                .Where(q => q.intId == request.Id)
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
                    (c, ct) => new { Complaint = c, ComplaintType = ct }
                )
                .Join(
                    _context.ComplaintAttachments,
                    c => c.Complaint.Complaint.intId,
                    ca => ca.intComplaintId,
                    (c, ca) => new { c.Complaint, c.ComplaintType, ComplaintAttachment = ca }
                )
                .Select(c => new ComplaintViewDTO
                {
                    intComplaintId = c.Complaint.Complaint.intId,
                    strUserName = c.Complaint.User.UserName,
                    dtmDateCreated = c.Complaint.Complaint.dtmDateCreated,
                    strComplaintTypeEn = c.ComplaintType.strNameEn,
                    strComplaintTypeAr = c.ComplaintType.strNameAr,
                    strMediaRef = c.ComplaintAttachment.strMediaRef,        // base 64 instead of image path
                    blnIsVideo = c.ComplaintAttachment.blnIsVideo
                })
                .FirstOrDefaultAsync();

            if (result == null)
            {
                return Result<ComplaintViewDTO>.Failure("Complaint not found");
            }

            return Result<ComplaintViewDTO>.Success(result);
        }

    }
}
