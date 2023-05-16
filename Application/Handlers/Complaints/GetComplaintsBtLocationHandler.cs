using Application.Core;
using Application.Queries.Complaints;
using Domain.ClientDTOs.Complaint;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Complaints
{
    public class GetComplaintsBtLocationHandler
        : IRequestHandler<GetComplaintsBtLocationQuery, Result<List<ComplaintsListDTO>>>
    {
        private readonly DataContext _context;

        public GetComplaintsBtLocationHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<List<ComplaintsListDTO>>> Handle(
            GetComplaintsBtLocationQuery request,
            CancellationToken cancellationToken
        )
        {
            var query =
                from c in _context.Complaints
                join u in _context.Users on c.intUserID equals u.Id
                join ct in _context.ComplaintTypes on c.intTypeId equals ct.intId
                join cs in _context.ComplaintStatus on c.intStatusId equals cs.intId
                join ca in _context.ComplaintAttachments on c.intId equals ca.intComplaintId
                select new
                {
                    Complaint = c,
                    UserName = u.UserName,
                    ComplaintTypeEn = ct.strNameEn,
                    ComplaintTypeAr = ct.strNameAr,
                    ComplaintGrade = ct.decGrade,
                    Status = cs.strName,
                    Lat = ca.decLat,
                    Lng = ca.decLng
                };

            var result = await query
                .AsNoTracking()
                .Select(
                    cg =>
                        new ComplaintsListDTO
                        {
                            intComplaintId = cg.Complaint.intId,
                            strUserName = cg.UserName,
                            dtmDateCreated = cg.Complaint.dtmDateCreated,
                            strComplaintTypeEn = cg.ComplaintTypeEn,
                            strComplaintTypeAr = cg.ComplaintTypeAr,
                            strComment = cg.Complaint.strComment,
                            strStatus = cg.Status,
                            latLng = new LatLng { decLat = cg.Lat, decLng = cg.Lng },
                            intVotersCount = _context.ComplaintVoters
                                .AsNoTracking()
                                .Where(cv => cv.intComplaintId == cg.Complaint.intId)
                                .Count(),
                        }
                )
                .ToListAsync(cancellationToken);

            return Result<List<ComplaintsListDTO>>.Success(result);
        }
    }
}
