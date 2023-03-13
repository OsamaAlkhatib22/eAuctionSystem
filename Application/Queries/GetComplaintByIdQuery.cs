using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application
{
    public record GetComplaintByIdQuery(int Id) : IRequest<Complaint>;
}
