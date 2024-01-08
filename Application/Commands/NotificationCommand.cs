using Application.Core;
using Domain.ClientDTOs.Notification;
using Domain.ClientDTOs.Service;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands
{
    public record NotificationCommand(NotificationDTO NotificationDTO)
              : IRequest<Result<NotificationDTO>>;
}


