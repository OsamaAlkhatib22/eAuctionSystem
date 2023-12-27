using Application.Core;
using Domain.ClientDTOs.Transaction;
using MediatR;

namespace Application.Queries.Transaction
{
    public record GetTransactionsListQuery(string username) : IRequest<Result<List<TransactionDTO>>>;
}
