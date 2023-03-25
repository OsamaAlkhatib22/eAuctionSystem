using Application.Core;
using Domain;
using MediatR;

namespace Application
{
    public record GetComplaintByUserIdQuery(int Id) : IRequest<Result<List<Complaint>>>;
}
