using Application.Core;
using Domain.ClientDTOs.Task;
using Domain.DataModels.Tasks;
using Domain.DataModels.Intersections;
using Domain.DataModels.User;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Domain.ClientDTOs.Complaint;

namespace Application.Handlers.Tasks
{
    public class InsertTasktHandler : IRequestHandler<InsertTaskCommand, Result<TaskDTO>>
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        public readonly UserManager<ApplicationUser> _userManager;

        public InsertTasktHandler(
            DataContext context,
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager
        )
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<Result<TaskDTO>> Handle(
            InsertTaskCommand request,
            CancellationToken cancellationToken
        )
        {
            var leaderCount = 0;
            var taskDTO = request.TaskDTO;
            var workersList = request.TaskDTO.workersList;
            var user = await _userManager.FindByNameAsync(taskDTO.strUserName);
            int userId = user.Id;
            int taskType = await _context.Complaints
                .Where(q => q.intId == request.Id)
                .Select(q => q.intTypeId)
                .FirstOrDefaultAsync();

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var task = new WorkTask //Date Activated and Date Finished should be null
                {
                    intAdminId = userId,
                    intStatusId = 1,
                    intTypeId = taskType,
                    decCost = request.TaskDTO.decCost ?? 0.00m,
                    dtmDateScheduled = request.TaskDTO.scheduledDate,
                    dtmDateDeadline = request.TaskDTO.deadlineDate,
                    intLastModifiedBy = userId,
                    strComment = request.TaskDTO.strComment,
                    dtmDateLastModified = DateTime.Now,
                    decRating = 0,
                    blnIsDeleted = false
                };
                var taskEntity = await _context.Tasks.AddAsync(task);
                await _context.SaveChangesAsync(cancellationToken);

                try
                {
                    if (workersList == null || workersList.Count == 0)
                    {
                        await transaction.RollbackAsync();
                        return Result<TaskDTO>.Failure("No Members were added");
                    }

                    foreach (var worker in workersList)
                    {
                        var user2 = await _context.Users.FindAsync(worker.intId);
                        if (user2 == null)
                        {
                            await transaction.RollbackAsync();
                            return Result<TaskDTO>.Failure($"Invalid user id: {worker.intId}");
                        }

                        var taskWorker = new WorkTaskMembers
                        {
                            intWorkerId = worker.intId,
                            intTaskId = taskEntity.Entity.intId,
                            blnIsLeader = worker.isLeader
                        };

                        await _context.TaskMembers.AddAsync(taskWorker);

                        if (worker.isLeader)
                            leaderCount++;
                    }

                    if (leaderCount == 0)
                    {
                        await transaction.RollbackAsync();
                        return Result<TaskDTO>.Failure("No leader was selected");
                    }
                    if (leaderCount > 1)
                    {
                        await transaction.RollbackAsync();
                        return Result<TaskDTO>.Failure("More than one leader was selected");
                    }

                    var taskComplaint = new WorkTaskComplaints
                    {
                        intTaskId = taskEntity.Entity.intId,
                        intComplaintId = request.Id
                    };

                    await _context.TasksComplaints.AddAsync(taskComplaint);
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    return Result<TaskDTO>.Failure("Unknown Error");
                }

                await _context.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return Result<TaskDTO>.Failure(ex.Message);
            }

            return Result<TaskDTO>.Success(taskDTO);
        }
    }
}
