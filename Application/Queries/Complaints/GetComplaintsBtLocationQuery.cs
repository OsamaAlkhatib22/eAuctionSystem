using Application.Core;
using Domain.ClientDTOs.Complaint;
using MediatR;

namespace Application.Queries.Complaints
{
    public record GetComplaintsBtLocationQuery() : IRequest<Result<List<ComplaintsListDTO>>>;
}
