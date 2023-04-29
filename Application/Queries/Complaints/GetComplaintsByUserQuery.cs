using Application.Core;
using Domain.DataModels.Complaints;
using MediatR;

namespace Application.Queries.Complaints
{
    public record GetComplaintsByUserQuery(string username) : IRequest<Result<List<Complaint>>>;
}
