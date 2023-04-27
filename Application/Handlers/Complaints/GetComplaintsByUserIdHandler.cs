using Application.Core;
using Application.Queries.Complaints;
using Domain.DataModels.Complaints;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Complaints
{
    public class GetComplaintsByUserIdHandler
        : IRequestHandler<GetComplaintByUserIdQuery, Result<List<Complaint>>>
    {
        private readonly DataContext _context;

        public GetComplaintsByUserIdHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<List<Complaint>>> Handle(
            GetComplaintByUserIdQuery request,
            CancellationToken cancellationToken
        )
        {
            var user = await _context.ApplicationUsers.Where(q => q.Id == request.Id).FirstAsync();
            var result = await _context.Complaints.Where(q => q.intUserID == user.Id).ToListAsync();
            return Result<List<Complaint>>.Success(result);
        }
    }
}
