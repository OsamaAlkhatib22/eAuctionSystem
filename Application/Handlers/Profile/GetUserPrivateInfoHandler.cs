using Application.Core;
using Application.Queries.Profile;
using Domain.ClientDTOs.Profile;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers.Profile
{
    public class GetUserPrivateInfoHandler
         : IRequestHandler<GetUserPrivateInfoQuery, Result<PrivateProfileDTO>>
    {

        private readonly DataContext _context;
        public GetUserPrivateInfoHandler(DataContext context)
        {
            _context = context;
        }
        public async Task<Result<PrivateProfileDTO>> Handle(
            GetUserPrivateInfoQuery request,
            CancellationToken cancellationToken
        )
        {
            var query =
            from t in _context.Users
            where t.UserName == request.UserName
            select new PrivateProfileDTO
            {
                Email = t.Email,
                PasswordHash = t.PasswordHash,
                user_name = t.UserName,
            


            };


            var result = await query.SingleOrDefaultAsync();


            return Result<PrivateProfileDTO>.Success(result);


        }




    }

}