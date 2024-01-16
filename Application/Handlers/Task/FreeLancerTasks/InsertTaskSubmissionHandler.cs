using Application.Commands;
using Application.Core;
using Application.Handlers.Notification;
using Domain.ClientDTOs.Notification;
using Domain.ClientDTOs.Service;
using Domain.DataModels.Services;
using Domain.DataModels.Users;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Persistence;
using System.Linq;

namespace Application.Handlers.Task
{
    public class InsertTaskSubmissionHandler
        : IRequestHandler<InsertTaskSubmissionCommand, Result<InsertTaskSubmissionDTO>>
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        public readonly UserManager<ApplicationUser> _userManager;
        public readonly NotificationHandler _notificationHandler;

        public InsertTaskSubmissionHandler(
            DataContext context,
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager,
            NotificationHandler notificationHandler
        )
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
            _notificationHandler = notificationHandler;
        }

        public async Task<Result<InsertTaskSubmissionDTO>> Handle(
            InsertTaskSubmissionCommand request,
            CancellationToken cancellationToken
        )
        {
            var taskDTO = request.InsertTaskSubmissionDTO;
            var lstMedia = taskDTO.lstMedia;

            var userId = await _context.Users
                .Where(u => u.UserName == request.InsertTaskSubmissionDTO.UserName)
                .Select(u => u.Id)
                .SingleOrDefaultAsync();

            using var transaction = await _context.Database.BeginTransactionAsync(
                cancellationToken
            );
            try
            {
                var serviceEntity = await _context.Services
                    .Where(s => s.ServiceId == request.InsertTaskSubmissionDTO.ServiceId)
                    .SingleOrDefaultAsync(); 

                if (serviceEntity != null)
                {
                    serviceEntity.status = "Completed"; 

                    var taskAttachments = new List<TaskAttachment>();
                    if (lstMedia.Count == 0)
                    {
                        taskDTO.Comment = request.InsertTaskSubmissionDTO.Comment != null ? request.InsertTaskSubmissionDTO.Comment : "No comment was provided by the freelancer";
                        taskAttachments.Add(
                                new TaskAttachment
                                {
                                    ServiceId = serviceEntity.ServiceId,

                                    MediaRef = "No images were added by the freelancer",
                                    DateCreated = DateTime.Now,
                                    FromFreeLancer = true,
                                    Comment = request.InsertTaskSubmissionDTO.Comment != null ? request.InsertTaskSubmissionDTO.Comment : "No comment was provided by the freelancer",

                                });


                    }
                    else
                    {
                        foreach (var media in lstMedia)
                        {
                            if (media == null || media.fileMedia == null)
                            {
                                await transaction.RollbackAsync();
                                return Result<InsertTaskSubmissionDTO>.Failure("File was not received (null).");
                            }

                            string extension = Path.GetExtension(media.fileMedia.FileName);
                            string fileName = $"{DateTime.Now.Ticks}{extension}";
                            string directory = _configuration["FilesPath"];
                            string path = Path.Join(
                                DateTime.Now.Year.ToString(),
                                DateTime.Now.Month.ToString(),
                                DateTime.Now.Day.ToString(),
                                serviceEntity.ServiceId.ToString()
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
                                    ServiceId = serviceEntity.ServiceId,
                                    //MediaRef = filePath != null ? filePath : "No images were added by the freelancer"
                                    MediaRef = request.InsertTaskSubmissionDTO.lstMedia.Count != 0 ? filePath : "No images were added by the freelancer",
                                    DateCreated = DateTime.Now,
                                    FromFreeLancer = true,
                                    Comment = request.InsertTaskSubmissionDTO.Comment != null ? request.InsertTaskSubmissionDTO.Comment : "No comment was provided by the freelancer",

                                }
                            );
                        }
                    }

                        await _context.TaskAttachments.AddRangeAsync(taskAttachments);
                    

                    await _notificationHandler.Handle(new NotificationCommand(
                         new NotificationDTO
                         {
                             UserId = serviceEntity.UserId,
                             Notification = $"Your Task has been Completed By (FreeLancer: {request.InsertTaskSubmissionDTO.UserName}) (Service Number: {request.InsertTaskSubmissionDTO.ServiceId})",
                             NotificationDate = DateTime.Now,
                         }
                         ), cancellationToken);



                    await _context.SaveChangesAsync(cancellationToken);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    await transaction.RollbackAsync();
                    return Result<InsertTaskSubmissionDTO>.Failure("Service not found.");
                }

                await transaction.CommitAsync();
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                return Result<InsertTaskSubmissionDTO>.Failure("Unknown Error" + e);
            }

            taskDTO.TaskSubmissionTime = DateTime.Now;
            return Result<InsertTaskSubmissionDTO>.Success(taskDTO);
        }
    }
}