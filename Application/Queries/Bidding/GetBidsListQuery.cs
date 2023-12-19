using Application.Core;
using Domain.ClientDTOs.Bidding;
using Domain.ClientDTOs.Transaction;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries.Bidding
{
    public record GetBidsListQuery(int id) : IRequest<Result<List<BidDTO>>>;
}
