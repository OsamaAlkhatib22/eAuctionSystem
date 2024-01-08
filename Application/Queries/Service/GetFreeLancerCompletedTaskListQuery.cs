using Application.Core;
using Domain.ClientDTOs.Service;
using Domain.ClientDTOs.Task;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries.Service
{
    public record GetFreeLancerCompletedTaskListQuery(string username) : IRequest<Result<List<FreeLancerTaskListDTO>>>;
}


