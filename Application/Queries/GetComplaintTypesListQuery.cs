using Application.Core;
using Domain.ClientDTOs.Complaint;
using MediatR;

namespace Application
{
    public record GetComplaintTypesListQuery() : IRequest<Result<List<ComplaintTypeDTO>>>;
}
