using Application.Core;
using Domain.ClientDTOs.Profile;
using MediatR;

namespace Application.Queries.Profile
{
    public record GetUserPublicInfoQuery(string Username) : IRequest<Result<PublicProfileDTO>>;
}
