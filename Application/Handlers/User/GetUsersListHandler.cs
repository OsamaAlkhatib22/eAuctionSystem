
using Application.Core;
using Application.Queries.User;
using Domain.ClientDTOs.User;
using Domain.Resources;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.User
{
    public class GetUsersListHandler
         : IRequestHandler<GetUsersListQuery, Result<List<UserDTO>>>
    {

        private readonly DataContext _context;
        public GetUsersListHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<List<UserDTO>>> Handle(
            GetUsersListQuery request,
            CancellationToken cancellationToken
        )
        {
            var query =
            from t in _context.Users
            select new UserDTO
            { 
                Password = t.PasswordHash,
                user_name = t.UserName,
                Bio = t.Bio,
                RegistrationDate = t.RegistrationDate,
                Email = t.Email,
                FirstName = t.FirstName,
                LastName = t.LastName,              
                UserTypeId = t.UserTypeId,
                UserType = _context.UserTypes.Where(q => q.UserTypeId == t.UserTypeId).Select(w => w.Type).SingleOrDefault(),
                UserId = t.Id,
                FieldOfWork = t.FieldOfWork,
                JobTitle = t.JobTitle,
                Rating = _context.UserRatings.Where(q => q.UserId == t.Id).Select(r => r.Rating).SingleOrDefault()

            };


            var result = await query.ToListAsync();


            return Result<List<UserDTO>>.Success(result);


        }




    }

}