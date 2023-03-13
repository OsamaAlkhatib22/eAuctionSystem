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
    public class InsertComplaintHandler : IRequestHandler<InsertComplaintCommand, Complaint>
    {
        private readonly DataContext _context;
        public InsertComplaintHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Complaint> Handle(InsertComplaintCommand request, CancellationToken cancellationToken)
        {
            _context.Complaints.Add(request.Complaint);
            await _context.SaveChangesAsync(cancellationToken);
            return await Task.FromResult(request.Complaint);
        }
    }
}
