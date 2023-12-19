using Application.Core;
using Domain.ClientDTOs.Review;
using MediatR;

namespace Application.Queries.Review
{
    public record GetReviewListQuery() : IRequest<Result<List<ReviewDTO>>>;
}
