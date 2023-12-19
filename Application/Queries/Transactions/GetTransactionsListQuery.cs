using Application.Core;
using Domain.ClientDTOs.Transaction;
using MediatR;

namespace Application.Queries.Transaction
{
    public record GetTransactionsListQuery() : IRequest<Result<List<TransactionDTO>>>;
}
