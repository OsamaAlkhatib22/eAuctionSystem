using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Handlers
{
    public class GetComplaintByIdHandler : IRequestHandler<GetComplaintByIdQuery, Complaint>
    {
        private readonly DataContext _context;
        public GetComplaintByIdHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Complaint> Handle(GetComplaintByIdQuery request, CancellationToken cancellationToken)
        {
            return await _context.Complaints.FindAsync(request.Id);
        }
    }
}
