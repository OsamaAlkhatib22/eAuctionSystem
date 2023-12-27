using Application.Core;
using Domain.DataModels.Transactions;
using MediatR;

namespace Application.Commands
{
    public record WithdrawMoneyFromWalletCommand(decimal Amount, string UserName) : IRequest<Result<Transaction>>;
}
