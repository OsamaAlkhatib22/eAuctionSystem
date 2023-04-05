using Application.Core;
using Domain.ClientDTOs.User;
using Domain.DataModels.User;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers
{
    public class GetWorkersListHandler
        : IRequestHandler<GetWorkersListQuery, Result<List<WorkerDTO>>>
    {
        private readonly DataContext _context;

        public GetWorkersListHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<List<WorkerDTO>>> Handle(
            GetWorkersListQuery request,
            CancellationToken cancellationToken
        )
        {
            List<WorkerDTO> result = await _context.Users
                 .Where(q => q.intUserTypeId == 2)
       .Join(
           _context.UserInfos,
           u => u.Id,
           ui => ui.intId,
           (u, ui) => new WorkerDTO{ 
           intId = u.Id,
           strFirstName = ui.strFirstName,
           strLastName = ui.strLastName,
           strPhoneNumber = ui.strPhoneNumber
           
           })
       .ToListAsync();
            return Result<List<WorkerDTO>>.Success(result);

        }
    }
}
