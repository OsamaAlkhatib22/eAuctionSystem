using Application.Core;
using Domain;
using MediatR;

namespace Application
{
    public record GetComplaintsListQuery() : IRequest<Result<List<Complaint>>>;
}
