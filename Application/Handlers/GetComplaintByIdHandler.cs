using Application.Core;
using Domain.DataModels.Complaints;
using MediatR;
using Persistence;

namespace Application.Handlers
{
    public class GetComplaintByIdHandler : IRequestHandler<GetComplaintByIdQuery, Result<Complaint>>
    {
        private readonly DataContext _context;

        public GetComplaintByIdHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Complaint>> Handle(
            GetComplaintByIdQuery request,
            CancellationToken cancellationToken
        )
        {
            var result = await _context.Complaints.FindAsync(request.Id);
            return Result<Complaint>.Success(result);
        }
    }
}
