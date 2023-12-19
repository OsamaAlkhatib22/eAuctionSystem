using Application.Core;
using Domain.ClientDTOs.Task;
using MediatR;

namespace Application.Queries.Service
{
    public record GetServiceListQuery() : IRequest<Result<List<TaskListDTO>>>;
}
