using Domain.DataModels.Complaints;
using MediatR;

namespace Application
{
    public record InsertComplaintCommand(Complaint Complaint) : IRequest<Complaint>;
}
