using Application.Core;
using Domain.ClientDTOs.Category;
using MediatR;

namespace Application.Queries.Category
{
    public record GetCategoryListQuery() : IRequest<Result<List<CategoryDTO>>>;
}
