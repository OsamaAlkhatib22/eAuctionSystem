using Application.Core;
using Application.Queries.Profile;
using Application.Queries.User;
using Domain.ClientDTOs.Profile;
using Domain.ClientDTOs.Transaction;
using Domain.ClientDTOs.User;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Profile
{
    public class GetUserPublicInfoHandler
         : IRequestHandler<GetUserPublicInfoQuery, Result<PublicProfileDTO>>
    {

        private readonly DataContext _context;
        public GetUserPublicInfoHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<PublicProfileDTO>> Handle(
            GetUserPublicInfoQuery request,
            CancellationToken cancellationToken
        )
        {
            var query =
            from t in _context.Users
            where t.UserName == request.Username
            select new PublicProfileDTO
            {
                FirstName = t.FirstName,
                LastName = t.LastName,
                Bio = t.Bio,
                FieldOfWork = t.FieldOfWork,
                JobTitle    = t.JobTitle,
                RegistrationDate = t.RegistrationDate,
                UserType = _context.UserTypes.Where(q => q.UserTypeId == t.UserTypeId).Select(w => w.Type).SingleOrDefault(),
                Rating = _context.UserRatings.Where(q => q.UserId == t.Id).Select(r => r.Rating).SingleOrDefault(),
                Skills = _context.UserSkills.Where(q=> q.UserId == t.Id).Select(r =>r.Skills.Skill).ToList(),
                Email = t.Email,
                Username = t.UserName,
                             

            };


            var result = await query.SingleOrDefaultAsync();


            return Result<PublicProfileDTO>.Success(result);


        }




    }

}