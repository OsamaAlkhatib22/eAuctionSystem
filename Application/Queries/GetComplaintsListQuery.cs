using Application.Core;
using Domain.DataModels.Complaints;
using MediatR;

namespace Application
{
    public record GetComplaintsListQuery() : IRequest<Result<List<Complaint>>>;
}
