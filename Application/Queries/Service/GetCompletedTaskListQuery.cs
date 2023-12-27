using Application.Core;
using Domain.ClientDTOs.Task;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries.Service
{
    public record GetCompletedTaskListQuery(string username) : IRequest<Result<List<TaskListDTO>>>;
}
