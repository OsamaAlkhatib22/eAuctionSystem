using Application.Core;
using Domain.ClientDTOs.User;
using Domain.DataModels.User;
using MediatR;

namespace Application
{
    public record GetWorkersListQuery() : IRequest<Result<List<WorkerDTO>>>;
}
