using Application.Core;
using Application.Queries.Notification;
using Domain.ClientDTOs.Notification;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Handlers.Notification
{
    public class GetNotificationsHandler
             : IRequestHandler<GetNotificationsQuery, Result<List<GetNotificationsDTO>>>
    {
        private readonly DataContext _context;
        public GetNotificationsHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<List<GetNotificationsDTO>>> Handle(
           GetNotificationsQuery request,
           CancellationToken cancellationToken
       )
        {
            int userid = await _context.Users.Where(t => t.UserName == request.username).Select(q => q.Id).SingleOrDefaultAsync();

            var query =
            from t in _context.Notifications
            where t.UserId == userid
            select new GetNotificationsDTO
            {
                Notification = t.Notification,
                UserId = userid,
                NotificationDate = DateTime.Now,
            };


            var result = await query.ToListAsync();


            return Result<List<GetNotificationsDTO>>.Success(result);
        }
    }
}

