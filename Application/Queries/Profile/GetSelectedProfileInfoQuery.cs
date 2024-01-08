using Application.Core;
using Domain.ClientDTOs.Profile;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries.Profile
{
    public record GetSelectedProfileInfoQuery(string UserName) : IRequest<Result<SelectedProfileDTO>>;
}
