using Application.Core;
using Domain.ClientDTOs.Bidding;
using MediatR;

namespace Application.Queries.Bidding
{
    public record GetAddBidsListQuery() : IRequest<Result<List<AddBidDTO>>>;
}
