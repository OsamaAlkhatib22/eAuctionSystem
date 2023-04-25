using Application.Core;
using Domain.DataModels.Complaints;
using MediatR;

namespace Application.Queries.Complaints
{
    public record GetComplaintByUserIdQuery(int Id) : IRequest<Result<List<Complaint>>>;
}
