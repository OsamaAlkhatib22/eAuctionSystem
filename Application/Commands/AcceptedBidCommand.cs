using Application.Core;
using Domain.ClientDTOs.Bidding;
using Domain.DataModels.Transactions;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands
{
    public record AcceptedBidCommand( int Bidid,string UserName) : IRequest<Result<Transaction>>;
}
