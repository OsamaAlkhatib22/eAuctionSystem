using Application.Core;
using Domain.DataModels.Tasks;
using MediatR;

namespace Application
{
    public record GetTasksListQuery() : IRequest<Result<List<WorkTask>>>;
}
