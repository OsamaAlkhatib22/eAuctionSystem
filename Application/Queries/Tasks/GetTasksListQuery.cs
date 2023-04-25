using Application.Core;
using Domain.DataModels.Tasks;
using MediatR;

namespace Application.Queries.Tasks
{
    public record GetTasksListQuery() : IRequest<Result<List<WorkTask>>>;
}
