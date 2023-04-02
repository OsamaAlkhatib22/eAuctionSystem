using Application.Core;
using Domain.ClientDTOs.Complaint;
using Domain.DataModels.Complaints;
using MediatR;

namespace Application
{
    public record GetComplaintsListQuery() : IRequest<Result<List<ComplaintListDTO>>>;
}
