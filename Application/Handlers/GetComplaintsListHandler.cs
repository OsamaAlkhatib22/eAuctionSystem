using Application.Core;
using Domain.DataModels.Complaints;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers
{
    public class GetComplaintsListHandler
        : IRequestHandler<GetComplaintsListQuery, Result<List<Complaint>>>
    {
        private readonly DataContext _context;

        public GetComplaintsListHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<List<Complaint>>> Handle(
            GetComplaintsListQuery request,
            CancellationToken cancellationToken
        )
        {
            var result = await _context.Complaints.ToListAsync();
            return Result<List<Complaint>>.Success(result);
        }
    }
}
