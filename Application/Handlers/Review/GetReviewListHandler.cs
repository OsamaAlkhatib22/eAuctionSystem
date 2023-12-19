using Application.Core;
using Application.Queries.Review;
using Domain.ClientDTOs.Review;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Review
{
    public class GetReviewListHandler
       : IRequestHandler<GetReviewListQuery, Result<List<ReviewDTO>>>
    {

        private readonly DataContext _context;
        public GetReviewListHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<List<ReviewDTO>>> Handle(
            GetReviewListQuery request,
            CancellationToken cancellationToken
        )
        {
            var query =
            from t in _context.Reviews
            select new ReviewDTO
            {

                ReviewId = t.ReviewId,
                ServiceId = t.ServiceId,
                UserId = t.UserId,
                Rating = t.Rating,
                Comment = t.Comment,
                ReviewDate = t.ReviewDate

            };


            var result = await query.ToListAsync();


            return Result<List<ReviewDTO>>.Success(result);


        }




    }

}