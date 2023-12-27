using Application.Core;
using Domain.DataModels.Transactions;
using MediatR;


namespace Application.Commands
{
    public record AddMoneyToWalletCommand( decimal Amount, string UserName):IRequest<Result<Transaction>>;
}
