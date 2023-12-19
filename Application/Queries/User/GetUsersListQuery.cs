using Application.Core;
using Domain.ClientDTOs.User;
using MediatR;

namespace Application.Queries.User
{
    public record GetUsersListQuery() : IRequest<Result<List<UserDTO>>>;
}
