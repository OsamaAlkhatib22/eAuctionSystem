using Application.Core;
using Application.Queries.Service;
using Domain.ClientDTOs.Service;
using Domain.ClientDTOs.Task;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Task
{
    public class GetTaskListHandler
         : IRequestHandler<GetServiceListQuery, Result<List<TaskListDTO>>>
    {

        private readonly DataContext _context;
        public GetTaskListHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<List<TaskListDTO>>> Handle(
            GetServiceListQuery request,
            CancellationToken cancellationToken
        )
        {
            var query =
            from t in _context.Services
            select new TaskListDTO
            {
              ServiceId =t.ServiceId,
               Title = t.Title,
               FirstName = _context.Users.Where(q => q.Id == t.UserId).Select(q => q.FirstName).SingleOrDefault(),
               LastName = _context.Users.Where(q => q.Id == t.UserId).Select(q => q.LastName).SingleOrDefault(),
                CreationDate = t.CreationDate,
               Description = t.Description,
            
            };


            var result = await query.ToListAsync();


            return Result<List<TaskListDTO>>.Success(result);


        }




    }

}