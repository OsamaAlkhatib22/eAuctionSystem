using Application.Commands;
using Application.Core;
using Domain.ClientDTOs.Service;
using Domain.DataModels.Services;
using Domain.DataModels.Users;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Persistence;

namespace Application.Handlers.Task
{
    public class InsertUserTaskHandler
        : IRequestHandler<CreateTaskUserCommand, Result<CreateTaskUserDTO>>
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        public readonly UserManager<ApplicationUser> _userManager;

        public InsertUserTaskHandler(
            DataContext context,
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager
        )
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<Result<CreateTaskUserDTO>> Handle(
            CreateTaskUserCommand request,
            CancellationToken cancellationToken
        )
        {
            var taskDTO = request.CreateTaskUserDTO;

            var userId = await _context.Users
                .Where(u => u.UserName == request.CreateTaskUserDTO.UserName)
                .Select(u => u.Id)
                .SingleOrDefaultAsync();

            using var transaction = await _context.Database.BeginTransactionAsync(
                cancellationToken
            );
            try
            {
                var task = new Service
                {
                    CreationDate = DateTime.UtcNow,
                    UserId = userId,
                    starting_bid = request.CreateTaskUserDTO.starting_bid,
                    BidDuration = request.CreateTaskUserDTO.bid_duration,
                    CategoryId = request.CreateTaskUserDTO.CategoryId,
                    Description = request.CreateTaskUserDTO.Description,
                    Title = request.CreateTaskUserDTO.Title,
                    status = "In Auction"
                };

                var taskEntity = await _context.Services.AddAsync(task);
                await _context.SaveChangesAsync(cancellationToken);

                taskDTO.ServiceId = taskEntity.Entity.ServiceId;

                var lstMedia = taskDTO.lstMedia;

                if (lstMedia.Count == 0)
                {
                    await transaction.RollbackAsync();
                    return Result<CreateTaskUserDTO>.Failure("No file was Uploaded.");
                }

                var taskAttachments = new List<TaskAttachment>();

                foreach (var media in lstMedia)
                {
                    if (media == null || media.fileMedia == null)
                    {
                        await transaction.RollbackAsync();
                        return Result<CreateTaskUserDTO>.Failure("File was not received (null).");
                    }
                    string extension = Path.GetExtension(media.fileMedia.FileName);
                    string fileName = $"{DateTime.UtcNow.Ticks}{extension}";
                    string directory = _configuration["FilesPath"];
                    string path = Path.Join(
                        DateTime.UtcNow.Year.ToString(),
                        DateTime.UtcNow.Month.ToString(),
                        DateTime.UtcNow.Day.ToString(),
                        taskEntity.Entity.ServiceId.ToString()
                    );
                    string filePath = Path.Join(directory, path, fileName);

                    // Create directory if it doesn't exist
                    Directory.CreateDirectory(Path.Combine(directory, path));

                    // Create file
                    using var stream = File.Create(filePath);
                    await media.fileMedia.CopyToAsync(stream, cancellationToken);

                    taskAttachments.Add(
                        new TaskAttachment
                        {
                            ServiceId = taskEntity.Entity.ServiceId,
                            MediaRef = filePath,
                           DateCreated= DateTime.UtcNow,
                            
                        }
                    );
                }

                await _context.TaskAttachments.AddRangeAsync(taskAttachments);
                await _context.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync();
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                return Result<CreateTaskUserDTO>.Failure("Unknown Error" + e);
            }

            return Result<CreateTaskUserDTO>.Success(taskDTO);
        }
    }
}
