using Application.Core;
using Domain.ClientDTOs.Complaint;
using Domain.DataModels.Complaints;
using MediatR;

namespace Application.Queries.Complaints
{
    public record GetComplaintByIdQuery(int Id) : IRequest<Result<AdminComplaintViewDTO>>;
}
