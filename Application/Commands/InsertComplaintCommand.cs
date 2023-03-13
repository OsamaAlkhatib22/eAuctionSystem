using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public record InsertComplaintCommand(Complaint Complaint) : IRequest<Complaint>;
}
