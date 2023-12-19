/*using Application.Core;
using Domain.DataModels.Complaints;
using Domain.DataModels.Tasks;
using Domain.Resources;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Handlers
{
    public class UpdateTaskByIdHandler : IRequestHandler<UpdateTaskCommand, Result<Unit>>
    {
        private readonly DataContext _context;

        public UpdateTaskByIdHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<Result<Unit>> Handle(UpdateTaskCommand request, CancellationToken cancellationToken)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var TasksStatus = await _context.Tasks
                    .Where(c => c.intId == request.Id)
                    .Select(c => c.intStatusId)
                    .FirstOrDefaultAsync(cancellationToken);

                if (TasksStatus == (int)TasksConstant.taskStatus.inactive)
                {
                    var taskAttachments = await _context.TaskAttachments
                         .Where(ca => ca.intTaskId == request.Id)
                         .ToListAsync(cancellationToken);

                    _context.TaskAttachments.RemoveRange(taskAttachments);
                    await _context.SaveChangesAsync(cancellationToken);
                }
                else
                    return Result<Unit>.Failure("Failed to delete the task.");
            }
            catch (DbUpdateException)
            {
                await transaction.RollbackAsync();
                return Result<Unit>.Failure("Failed to delete task.");
            }


            try
            {
                var taskComplaint = await _context.TasksComplaints
                    .Where(cc => cc.intTaskId == request.Id)
                    .ToListAsync(cancellationToken);

                _context.TasksComplaints.RemoveRange(taskComplaint);
                await _context.SaveChangesAsync(cancellationToken);
            }
            catch (DbUpdateException)
            {
                await transaction.RollbackAsync();
                return Result<Unit>.Failure("Failed to delete task.");
            }


            try
            {
                var task = new WorkTask { intId = request.Id };
                _context.Tasks.Attach(task);
                _context.Tasks.Remove(task);

                await _context.SaveChangesAsync(cancellationToken);
            }
            catch (DbUpdateException)
            {
                await transaction.RollbackAsync();
                return Result<Unit>.Failure("Failed to delete tasks.");
            }
            await transaction.CommitAsync();
            return Result<Unit>.Success(Unit.Value);
        }
    }
}*/