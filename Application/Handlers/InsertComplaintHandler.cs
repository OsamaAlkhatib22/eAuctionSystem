using Application.Core;
using Domain.ClientDTOs.Complaint;
using Domain.DataModels.Complaints;
using MediatR;
using Microsoft.Extensions.Configuration;
using Persistence;

namespace Application.Handlers
{
    public class InsertComplaintHandler
        : IRequestHandler<InsertComplaintCommand, Result<ComplaintDTO>>
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public InsertComplaintHandler(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<Result<ComplaintDTO>> Handle(
            InsertComplaintCommand request,
            CancellationToken cancellationToken
        )
        {
            var complaintDTO = request.ComplaintDTO;
            var fileImage = complaintDTO.fileImage;

            if (fileImage == null || fileImage.Length == 0)
            {
                return Result<ComplaintDTO>.Failure("No file was Uploaded.");
            }

            // BUG: FILES CONTAIN THE SAME NAME, LEADS TO OVERRIDE, ZOMBIES.
            // GENERATE UNIQUE NAMES
            string fileName = fileImage.FileName;
            string directory = _configuration["FilesPath"];
            string path =
                @$"{DateTime.Now.Year}\{DateTime.Now.Month}\{DateTime.Now.Day}\{complaintDTO.intUserId}\";
            string filePath = Path.Combine(directory, path, fileName);

            // Create directory if it doesn't exist
            string directoryPath = Path.Combine(directory, path);
            if (!Directory.Exists(Path.GetDirectoryName(directoryPath)))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(directoryPath));
            }

            // Create file
            using (var stream = File.Create(filePath))
            {
                await fileImage.CopyToAsync(stream, cancellationToken);
            }

            var complaint = new Complaint
            {
                intUserID = complaintDTO.intUserId,
                intTypeId = complaintDTO.intTypeId,
                intStatusId = 1,
                strImageRef = filePath,
                decLat = (decimal)complaintDTO.decLat,
                decLng = (decimal)complaintDTO.decLng,
                strComment = complaintDTO?.strComment,
                intReminder = 1,
                dtmDateCreated = DateTime.Now,
                dtmDateLastReminded = DateTime.Now,
                intLastModifiedBy = complaintDTO.intUserId,
                dtmDateLastModified = DateTime.Now,
            };
            _context.Complaints.Add(complaint);
            await _context.SaveChangesAsync(cancellationToken);

            return Result<ComplaintDTO>.Success(complaintDTO);
        }
    }
}
