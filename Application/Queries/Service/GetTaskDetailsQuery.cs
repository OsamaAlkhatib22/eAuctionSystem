using Application.Core;
using Domain.ClientDTOs.Service;
using MediatR;

namespace Application.Queries.Service
{
    public record GetTaskDetailsQuery(int id) : IRequest<Result<ServiceDTO>>;
}
