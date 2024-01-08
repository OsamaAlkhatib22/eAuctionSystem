using Application.Core;
using Domain.ClientDTOs.Service;
using Domain.ClientDTOs.Transaction;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries.Transactions
{
    public record GetTransactionDetailsQuery(int id) : IRequest<Result<TransactionDetailsDTO>>;
}
