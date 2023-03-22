using Application.Core;
using Domain;
using MediatR;

namespace Application
{
    public record GetComplaintByIdQuery(int Id) : IRequest<Result<Complaint>>;
}
