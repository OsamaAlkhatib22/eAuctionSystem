using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Handlers
{
    public class GetComplaintsListHandler : IRequestHandler<GetComplaintsListQuery, List<Complaint>>
    {
        private readonly DataContext _context;

        public GetComplaintsListHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Complaint>> Handle(
            GetComplaintsListQuery request,
            CancellationToken cancellationToken
        )
        {
            return await _context.Complaints.ToListAsync();
        }
    }
}
