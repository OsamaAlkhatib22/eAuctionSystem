using Application.Core;
using Application.Queries.Profile;
using Domain.ClientDTOs.Profile;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Profile
{
    public class GetSelectedProfileInfoHandler
         : IRequestHandler<GetSelectedProfileInfoQuery, Result<SelectedProfileDTO>>
    {

        private readonly DataContext _context;
        public GetSelectedProfileInfoHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<SelectedProfileDTO>> Handle(
            GetSelectedProfileInfoQuery request,
            CancellationToken cancellationToken
        )
        {
            var query =
            from t in _context.Users
            where t.UserName == request.UserName
            select new SelectedProfileDTO
            {
                FirstName = t.FirstName,
                LastName = t.LastName,
                Bio = t.Bio,
                FieldOfWork = t.FieldOfWork,
                JobTitle = t.JobTitle,
                RegistrationDate = t.RegistrationDate,
                UserType = _context.UserTypes.Where(q => q.UserTypeId == t.UserTypeId).Select(w => w.Type).SingleOrDefault(),
                Rating = _context.UserRatings.Where(q => q.UserId == t.Id).Select(r => r.Rating).SingleOrDefault(),
                Skills = _context.UserSkills.Where(q => q.UserId == t.Id).Select(r => r.Skills.Skill).ToList(),
                Email = t.Email,
                Username = t.UserName,



            };


            var result = await query.SingleOrDefaultAsync();


            return Result<SelectedProfileDTO>.Success(result);


        }




    }

}