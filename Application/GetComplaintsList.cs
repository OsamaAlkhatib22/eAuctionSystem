using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application
{
    public class GetComplaintsList
    {
        public class Query : IRequest<List<Complaint>> { }

        public class Handler : IRequestHandler<Query, List<Complaint>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Complaint>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Complaints.ToListAsync();
            }
        }
    }
}
