using Application.Core;
using Application.Queries.Complaints;
using Domain.DataModels.Complaints;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Complaints
{
    public class GetComplaintsByUserHandler
        : IRequestHandler<GetComplaintsByUserQuery, Result<List<Complaint>>>
    {
        private readonly DataContext _context;

        public GetComplaintsByUserHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<List<Complaint>>> Handle(
            GetComplaintsByUserQuery request,
            CancellationToken cancellationToken
        )
        {
            var result = await _context.Complaints.Where(q => q.intUserID == user.Id).ToListAsync();
            return Result<List<Complaint>>.Success(result);
        }
    }
}
