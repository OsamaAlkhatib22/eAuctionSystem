using Application.Core;
using Application.Queries.Category;
using Domain.ClientDTOs.Category;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Category
{
    public class GetCategoryListHandler
         : IRequestHandler<GetCategoryListQuery, Result<List<CategoryDTO>>>
    {

        private readonly DataContext _context;
        public GetCategoryListHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<List<CategoryDTO>>> Handle(
            GetCategoryListQuery request,
            CancellationToken cancellationToken
        )
        {
            var query =
            from t in _context.Categories
            select new CategoryDTO
            {
                intCategoryId = t.intId,
                strCategoryName = t.strCategoryName
            };


            var result = await query.ToListAsync();


            return Result<List<CategoryDTO>>.Success(result);


        }




    }

}