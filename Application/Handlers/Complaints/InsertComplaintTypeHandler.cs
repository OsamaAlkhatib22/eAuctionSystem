using Application.Core;
using Application;
using Domain.ClientDTOs.Complaint;
using MediatR;
using Persistence;
using Domain.DataModels.Complaints;
using Microsoft.AspNetCore.Identity;
using Domain.DataModels.User;
using Microsoft.Extensions.Configuration;
using Domain.ClientDTOs.Complaint;
using Microsoft.EntityFrameworkCore;

public class InsertComplaintTypeHandler : IRequestHandler<InsertComplaintTypeCommand, Result<ComplaintTypeDTO>>
{
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;
    public readonly UserManager<ApplicationUser> _userManager;

    public InsertComplaintTypeHandler(
            DataContext context,
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager
        )
    {
        _context = context;
        _configuration = configuration;
        _userManager = userManager;

    }

    public async Task<Result<ComplaintTypeDTO>> Handle(InsertComplaintTypeCommand request, CancellationToken cancellationToken)
    {

        var complaintTypeDTO = request.ComplaintTypeDTO;

        var user = await _userManager.FindByNameAsync(complaintTypeDTO.strUserName);
        int userId = await _context.Users
               .Where(q => q.UserName == complaintTypeDTO.strUserName)
               .Select(q => q.Id)
               .FirstOrDefaultAsync();

        var complaintType = new ComplaintType
        {
            intDepartmentId = request.ComplaintTypeDTO.intDepartmentId,
            strNameAr = request.ComplaintTypeDTO.strNameAr,
            strNameEn = request.ComplaintTypeDTO.strNameEn,
            decGrade = request.ComplaintTypeDTO.decGrade,
            intPrivacyId = request.ComplaintTypeDTO.intPrivacyId,
            intCreatedBy = user.Id,
            dtmDateCreated = DateTime.Now,
            intLastModifiedBy = user.Id,
            dtmDateLastModified = DateTime.Now,
            blnIsDeleted = false
        };

        await _context.ComplaintTypes.AddAsync(complaintType, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);



        return Result<ComplaintTypeDTO>.Success(complaintTypeDTO);
    }
}
