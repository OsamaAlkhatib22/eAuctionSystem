using Application.Core;
using Domain.ClientDTOs.Notification;
using Domain.ClientDTOs.Transaction;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries.Notification
{
    public record GetNotificationsQuery(string username) : IRequest<Result<List<GetNotificationsDTO>>>;
}
