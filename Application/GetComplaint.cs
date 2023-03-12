using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application
{
    public class GetComplaint
    {
        public class Query : IRequest<Complaint> { 
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Complaint>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Complaint> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Complaints.FindAsync(request.Id);
            }

        }
    }
}
