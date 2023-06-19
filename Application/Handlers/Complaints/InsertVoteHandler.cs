﻿using Application.Core;
using Domain.DataModels.Intersections;
using Domain.DataModels.User;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Persistence;

namespace Application.Handlers.Complaints
{
    public class InsertVoteHandler : IRequestHandler<InsertVoteCommand, Result<int>>
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        public readonly UserManager<ApplicationUser> _userManager;

        public InsertVoteHandler(
            DataContext context,
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager
        )
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<Result<int>> Handle(
            InsertVoteCommand request,
            CancellationToken cancellationToken
        )
        {
            var userId = await _context.Users
                .Where(u => u.UserName == request.strUserName)
                .Select(u => u.Id)
                .SingleOrDefaultAsync(cancellationToken: cancellationToken);

            await _context.ComplaintVoters.AddAsync(
                new ComplaintVoters { intComplaintId = request.intComplaintID, intUserId = userId }
            );
            await _context.SaveChangesAsync();

            return Result<int>.Success(request.intComplaintID);
        }
    }
}
