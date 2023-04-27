using Application.Core;
using Domain.ClientDTOs.Complaint;
using Domain.DataModels.Complaints;
using Domain.DataModels.Intersections;
using Domain.DataModels.User;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Persistence;

namespace Application.Handlers.Complaints
{
    public class InsertComplaintHandler
        : IRequestHandler<InsertComplaintCommand, Result<ComplaintDTO>>
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        public readonly UserManager<ApplicationUser> _userManager;

        public InsertComplaintHandler(
            DataContext context,
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager
        )
        {
            _context = context;
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<Result<ComplaintDTO>> Handle(
            InsertComplaintCommand request,
            CancellationToken cancellationToken
        )
        {
            var complaintDTO = request.ComplaintDTO;
            var lstMedia = complaintDTO.lstMedia;
            var user = await _userManager.FindByNameAsync(complaintDTO.strUserName);
            int userId = user.Id;

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var complaint = new Complaint
                {
                    intUserID = userId,
                    intTypeId = complaintDTO.intTypeId,
                    intStatusId = 1,
                    strComment = complaintDTO?.strComment,
                    intReminder = 1,
                    dtmDateCreated = DateTime.Now,
                    dtmDateLastReminded = DateTime.Now,
                    intLastModifiedBy = userId,
                    dtmDateLastModified = DateTime.Now,
                };
                var complaintEntity = await _context.Complaints.AddAsync(complaint);
                await _context.SaveChangesAsync(cancellationToken);

                List<string> filesPaths = new List<string>();
                try
                {
                    if (lstMedia == null || lstMedia.Count == 0)
                    {
                        await transaction.RollbackAsync();
                        return Result<ComplaintDTO>.Failure("No file was Uploaded.");
                    }

                    foreach (var media in lstMedia)
                    {
                        string extension = Path.GetExtension(media.FileName);
                        string fileName = $"{DateTime.UtcNow.Ticks}{extension}";
                        string directory = _configuration["FilesPath"];
                        string path =
                            @$"{DateTime.Now.Year}\{DateTime.Now.Month}\{DateTime.Now.Day}\{complaintEntity.Entity.intId}\";
                        string filePath = Path.Combine(directory, path, fileName);

                        // Create directory if it doesn't exist
                        string directoryPath = Path.Combine(directory, path);
                        if (!Directory.Exists(Path.GetDirectoryName(directoryPath)))
                        {
                            Directory.CreateDirectory(Path.GetDirectoryName(directoryPath));
                        }

                        // Create file
                        filesPaths.Add(filePath);
                        using var stream = File.Create(filePath);
                        await media.CopyToAsync(stream, cancellationToken);
                    }
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    return Result<ComplaintDTO>.Failure("Unknown Error");
                }

                if (filesPaths.Count == 0)
                {
                    await transaction.RollbackAsync();
                    return Result<ComplaintDTO>.Failure("Unknown Error");
                }

                foreach (var filePath in filesPaths)
                {
                    var complaintAttachment = new ComplaintAttachment
                    {
                        intComplaintId = complaintEntity.Entity.intId,
                        strMediaRef = filePath,
                        decLat = (decimal)complaintDTO.decLat,
                        decLng = (decimal)complaintDTO.decLng,
                        blnIsVideo = complaintDTO.blnIsVideo,
                        dtmDateCreated = DateTime.Now,
                        intCreatedBy = userId
                    };
                    await _context.ComplaintAttachments.AddAsync(complaintAttachment);
                }

                await _context.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                return Result<ComplaintDTO>.Failure("Unknown Error");
            }

            return Result<ComplaintDTO>.Success(complaintDTO);
        }
    }
}
