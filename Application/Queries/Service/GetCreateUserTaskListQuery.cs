using Application.Core;
using Domain.ClientDTOs.Service;
using MediatR;

namespace Application.Queries.Service
{
    public record GetCreateUserTaskListQuery() : IRequest<Result<List<CreateTaskUserDTO>>>;
}
