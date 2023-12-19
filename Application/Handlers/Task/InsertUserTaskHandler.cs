using Application.Core;
using MediatR;
using Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Application.Commands;
using Domain.ClientDTOs.Service;
using Domain.DataModels.Users;
using Microsoft.EntityFrameworkCore;
using Domain.DataModels.Services;

public class InsertUserTaskHandler : IRequestHandler<CreateTaskUserCommand, Result<CreateTaskUserDTO>>
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

    //add limits to lowest and highest bid duration 

    

    public async Task<Result<CreateTaskUserDTO>> Handle(CreateTaskUserCommand request, CancellationToken cancellationToken)
    {

        int UserId = await _context.Users.Where(q => q.UserName == request.UserName).Select(q => q.Id).SingleOrDefaultAsync();
        
        Service  newTask = new Service { 
        
            CreationDate = DateTime.UtcNow,
            UserId = UserId,
           starting_bid = request.CreateTaskUserDTO.starting_bid,
           BidDuration = request.CreateTaskUserDTO.bid_duration,
            CategoryId = request.CreateTaskUserDTO.CategoryId,
            Description = request.CreateTaskUserDTO.Description,    
            
            Title = request.CreateTaskUserDTO.Title
        };


        
        var taskEntity = await _context.Services.AddAsync(newTask);// Add the task to the context
        var TaskDTO = request.CreateTaskUserDTO;
        var lstMedia = TaskDTO.lstMedia;
        await _context.SaveChangesAsync(cancellationToken);// Save changes to the database
        //request.CreateTaskUserDTO.attachmentsDTOs != null
        if (lstMedia.Count != 0)
        {
            Console.WriteLine("zpidermannnnnnnnnnnnnnnnnnn");
            var taskAttachments = new List<TaskAttachment>();
            foreach (var attachmentDTO in lstMedia)
            {
                string extension = Path.GetExtension(attachmentDTO.fileMedia.FileName);
                string fileName = $"{DateTime.UtcNow.Ticks}{extension}";
                string directory = _configuration["FilesPath"];
                string path = Path.Combine(
                    DateTime.UtcNow.Year.ToString(),
                    DateTime.UtcNow.Month.ToString(),
                    DateTime.UtcNow.Day.ToString(),
                    taskEntity.Entity.ServiceId.ToString()
                );
                string filePath = Path.Combine(directory, path, fileName);

                // Create directory if it doesn't exist
                Directory.CreateDirectory(Path.Combine(directory, path));

                // Create file
                using var stream = File.Create(filePath);
                await attachmentDTO.fileMedia.CopyToAsync(stream, cancellationToken);

                taskAttachments.Add(
                    new TaskAttachment
                    {
                        ServiceId = newTask.ServiceId,
                        MediaRef = filePath,
                        DateCreated = DateTime.UtcNow
                    }
                );
            }

            await _context.TaskAttachments.AddRangeAsync(taskAttachments);
            await _context.SaveChangesAsync(cancellationToken);
        }

        return Result<CreateTaskUserDTO>.Success(request.CreateTaskUserDTO);

    }
}
