using Application.Core;
using Domain.ClientDTOs.Complaint;
using Domain.DataModels.Complaints;
using MediatR;

namespace Application
{
    public record GetComplaintByIdQuery(int Id) : IRequest<Result<ComplaintViewDTO>>;
}
