using Application.Commands;
using Application.Core;
using Domain.ClientDTOs.Notification;
using Domain.DataModels.Notifications;
using Domain.DataModels.Users;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Persistence;

namespace Application.Handlers.Notification
{
    public class NotificationHandler
        : IRequestHandler<NotificationCommand, Result<NotificationDTO>>
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        public readonly UserManager<ApplicationUser> _userManager;

        public NotificationHandler(DataContext context, IConfiguration configuration, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<Result<NotificationDTO>> Handle(
            NotificationCommand request,
            CancellationToken cancellationToken
        )
        {

            var notificationDto = request.NotificationDTO;

            try
            {

                var notification = new Notifications
                {
                    NotificationDate = DateTime.Now,
                    UserId = request.NotificationDTO.UserId,
                    Notification = request.NotificationDTO.Notification,
                };


                await _context.Notifications.AddAsync(notification);
                await _context.SaveChangesAsync(cancellationToken);


            }
            catch (Exception e)
            {
                return Result<NotificationDTO>.Failure("Unknown Error" + e);
            }
            notificationDto.NotificationDate = DateTime.Now;
            return Result<NotificationDTO>.Success(notificationDto);
        }
    }
}