using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application
{
    public record GetComplaintsListQuery() : IRequest<List<Complaint>>;
}
