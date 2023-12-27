using Application.Core;
using Application.Queries.Service;
using Domain.ClientDTOs.Service;
using Domain.ClientDTOs.Task;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Task
{
    public class GetCompletedTaskListHandler
         : IRequestHandler<GetCompletedTaskListQuery, Result<List<TaskListDTO>>>
    {

        private readonly DataContext _context;
        public GetCompletedTaskListHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<List<TaskListDTO>>> Handle(
            GetCompletedTaskListQuery request,
            CancellationToken cancellationToken
        )
        {
            int userid = await _context.Users.Where(t => t.UserName == request.username).Select(q => q.Id).SingleOrDefaultAsync();

            var query =
            from t in _context.Services
            where userid == t.UserId && t.status=="Completed"
            orderby t.CreationDate descending
            select new TaskListDTO
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


            return Result<List<TaskListDTO>>.Success(result);


        }




    }

}