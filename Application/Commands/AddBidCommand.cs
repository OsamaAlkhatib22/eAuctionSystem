using Application.Core;
using Domain.ClientDTOs.Bidding;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands
{
    public record AddBidCommand(AddBidDTO AddBidDTO, int id)
       : IRequest<Result<AddBidDTO>>;
}



