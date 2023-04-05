using Application.Core;
using Domain.DataModels.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers
{
    public class GetTasksListHandler
        : IRequestHandler<GetTasksListQuery, Result<List<WorkTask>>>
    {
        private readonly DataContext _context;

        public GetTasksListHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<List<WorkTask>>> Handle(
            GetTasksListQuery request,
            CancellationToken cancellationToken
        )
        {
            var result = await _context.Tasks.ToListAsync();
            return Result<List<WorkTask>>.Success(result);
        }
    }
}
