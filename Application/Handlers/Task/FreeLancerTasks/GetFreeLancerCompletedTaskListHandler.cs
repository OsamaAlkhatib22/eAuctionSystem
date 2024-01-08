using Application.Core;
using Application.Queries.Service;
using Domain.ClientDTOs.Service;
using Domain.ClientDTOs.Task;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Task
{
    public class GetFreeLancerCompletedTaskListHandler
         : IRequestHandler<GetFreeLancerCompletedTaskListQuery, Result<List<FreeLancerTaskListDTO>>>
    {

        private readonly DataContext _context;
        public GetFreeLancerCompletedTaskListHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<List<FreeLancerTaskListDTO>>> Handle(
            GetFreeLancerCompletedTaskListQuery request,
            CancellationToken cancellationToken
        )
        {
            int freelancerId = await _context.Users.Where(q => q.UserName == request.username).Select(q => q.Id).SingleOrDefaultAsync();

            var query = from t in _context.Services
                        where (t.status == "Completed" && _context.Bids.Any(b => b.ServiceId == t.ServiceId && b.BidderId == freelancerId))
                        orderby t.CreationDate descending
                        select new FreeLancerTaskListDTO
                        {
                            ServiceId = t.ServiceId,
                            Title = t.Title,
                            FirstName = _context.Users.Where(q => q.Id == t.UserId).Select(q => q.FirstName).SingleOrDefault(),
                            LastName = _context.Users.Where(q => q.Id == t.UserId).Select(q => q.LastName).SingleOrDefault(),
                            CreationDate = t.CreationDate,
                            Description = t.Description,
                            status = t.status
                        };



            var result = await query.ToListAsync();


            return Result<List<FreeLancerTaskListDTO>>.Success(result);


        }




    }

}