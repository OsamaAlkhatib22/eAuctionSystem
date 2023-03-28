using Application.Core;
using Domain.ClientDTOs.Complaint;
using MediatR;

namespace Application
{
    public record InsertComplaintCommand(ComplaintDTO ComplaintDTO)
        : IRequest<Result<ComplaintDTO>>;
}
