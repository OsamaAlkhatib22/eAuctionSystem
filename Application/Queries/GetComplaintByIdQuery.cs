using Application.Core;
using Domain.DataModels.Complaints;
using MediatR;

namespace Application
{
    public record GetComplaintByIdQuery(int Id) : IRequest<Result<Complaint>>;
}
