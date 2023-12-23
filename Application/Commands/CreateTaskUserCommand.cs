using Application.Core;
using Application.Queries.Service;
using Domain.ClientDTOs.Service;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Commands
{
    public record CreateTaskUserCommand(CreateTaskUserDTO CreateTaskUserDTO)
        : IRequest<Result<CreateTaskUserDTO>>;
    
    
    
}
