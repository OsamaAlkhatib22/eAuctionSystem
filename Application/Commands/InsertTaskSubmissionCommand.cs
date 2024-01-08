using Application.Core;
using Domain.ClientDTOs.Service;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands
{
    public record InsertTaskSubmissionCommand(InsertTaskSubmissionDTO InsertTaskSubmissionDTO)
            : IRequest<Result<InsertTaskSubmissionDTO>>;
}
