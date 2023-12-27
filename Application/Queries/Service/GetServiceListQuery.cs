using Application.Core;
using Domain.ClientDTOs.Task;
using MediatR;

namespace Application.Queries.Service
{
    public record GetServiceListQuery(string username) : IRequest<Result<List<TaskListDTO>>>;
}
