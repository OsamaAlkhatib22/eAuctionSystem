using Domain.DataModels.Complaints;
using Domain.DataModels.User;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(
            DataContext context,
            UserManager<ApplicationUser> userManager
        )
        {
            if (!userManager.Users.Any())
            {
                int typeAdmin = 0,
                    typeWorker = 0,
                    typeUser = 0;

                if (!context.UserTypes.Any())
                {
                    var typeAdminEntity = await context.UserTypes.AddAsync(
                        new UserType { strName = "admin" }
                    );

                    var typeWorkerEntity = await context.UserTypes.AddAsync(
                        new UserType { strName = "worker" }
                    );

                    var typeUserEntity = await context.UserTypes.AddAsync(
                        new UserType { strName = "user" }
                    );

                    await context.SaveChangesAsync();

                    // await saving to get valid IDs otherwise you'll get a zero which violates the Foreign key constraint
                    typeAdmin = typeAdminEntity.Entity.intId;
                    typeWorker = typeWorkerEntity.Entity.intId;
                    typeUser = typeUserEntity.Entity.intId;
                }

                var infoAdmin = await context.UserInfos.AddAsync(
                    new UserInfo
                    {
                        strFirstName = "Admin",
                        strLastName = "User",
                        strNationalId = "2000555333",
                        strNationalIdNumber = "RUX55333"
                    }
                );
                var infoWorker = await context.UserInfos.AddAsync(
                    new UserInfo
                    {
                        strFirstName = "Worker",
                        strLastName = "User",
                        strNationalId = "2000111222",
                        strNationalIdNumber = "RUX11222"
                    }
                );
                var infoUser = await context.UserInfos.AddAsync(
                    new UserInfo
                    {
                        strFirstName = "User",
                        strLastName = "User",
                        strNationalId = "2000666888",
                        strNationalIdNumber = "RUX66888"
                    }
                );
                await context.SaveChangesAsync();

                // Create users AFTER awaiting info creation and types
                var userAdmin = new ApplicationUser
                {
                    Email = "admin@test.com",
                    EmailConfirmed = true,
                    PhoneNumber = "0799999999",
                    PhoneNumberConfirmed = true,
                    UserName = "admin",
                    blnIsVerified = false,
                    blnIsActive = false,
                    blnIsBlacklisted = false,
                    intUserInfo = infoAdmin.Entity.intId,
                    intUserType = typeAdmin,
                };

                var userWorker = new ApplicationUser
                {
                    Email = "worker@test.com",
                    EmailConfirmed = true,
                    PhoneNumber = "0788888888",
                    PhoneNumberConfirmed = true,
                    UserName = "worker",
                    blnIsVerified = false,
                    blnIsActive = false,
                    blnIsBlacklisted = false,
                    intUserInfo = infoWorker.Entity.intId,
                    intUserType = typeWorker,
                };

                var userUser = new ApplicationUser
                {
                    Email = "user@test.com",
                    EmailConfirmed = true,
                    PhoneNumber = "0777777777",
                    PhoneNumberConfirmed = true,
                    UserName = "user",
                    blnIsVerified = false,
                    blnIsActive = false,
                    blnIsBlacklisted = false,
                    intUserInfo = infoUser.Entity.intId,
                    intUserType = typeUser,
                };

                await userManager.CreateAsync(userAdmin, "Pass@123");
                await userManager.CreateAsync(userWorker, "Pass@123");
                await userManager.CreateAsync(userUser, "Pass@123");
            }

            if (!context.Complaints.Any())
            {
                var complaints = new List<Complaint>
                {
                    new Complaint
                    {
                        intUserID = 3,
                        intTypeId = 1,
                        intStatusId = 1,
                        strImageRef = "imageid",
                        // two ways to cast decimals
                        decLat = 32.565555M,
                        decLng = (decimal)38.598984,
                        strComment = "can be null",
                        intReminder = 1,
                        dtmDateLastModified = DateTime.Now,
                        dtmDateLastReminded = DateTime.Now,
                        intLastModifiedBy = 1,
                        dtmDateCreated = DateTime.Now,
                    },
                    new Complaint
                    {
                        intUserID = 3,
                        intTypeId = 2,
                        intStatusId = 1,
                        strImageRef = "imageid",
                        // two ways to cast decimals
                        decLat = 32.894555M,
                        decLng = (decimal)38.264984,
                        strComment = "can be null",
                        intReminder = 1,
                        dtmDateLastModified = DateTime.Now,
                        dtmDateLastReminded = DateTime.Now,
                        intLastModifiedBy = 1,
                        dtmDateCreated = DateTime.Now,
                    },
                    new Complaint
                    {
                        intUserID = 3,
                        intTypeId = 3,
                        intStatusId = 1,
                        strImageRef = "imageid",
                        // two ways to cast decimals
                        decLat = 32.122555M,
                        decLng = (decimal)38.500284,
                        strComment = "can be null",
                        intReminder = 1,
                        dtmDateLastModified = DateTime.Now,
                        dtmDateLastReminded = DateTime.Now,
                        intLastModifiedBy = 1,
                        dtmDateCreated = DateTime.Now,
                    }
                };

                await context.Complaints.AddRangeAsync(complaints);

                if (!context.ComplaintStatus.Any())
                {
                    var complaintStatus = new List<ComplaintStatus>
                    {
                        new ComplaintStatus { strName = "Pending" },
                        new ComplaintStatus { strName = "Rejected" },
                        new ComplaintStatus { strName = "Approved" },
                        new ComplaintStatus { strName = "Scheduled" },
                        new ComplaintStatus { strName = "In Progress" },
                        new ComplaintStatus { strName = "Waiting Evaluation" },
                        new ComplaintStatus { strName = "Completed" },
                        new ComplaintStatus { strName = "Re-Filed" }
                    };
                    await context.ComplaintStatus.AddRangeAsync(complaintStatus);
                }

                if (!context.ComplaintPrivacy.Any())
                {
                    var complaintPrivacy = new List<ComplaintPrivacy>
                    {
                        new ComplaintPrivacy { strName = "Private" },
                        new ComplaintPrivacy { strName = "Public" },
                        new ComplaintPrivacy { strName = "Any" },
                    };
                    await context.ComplaintPrivacy.AddRangeAsync(complaintPrivacy);
                }

                await context.SaveChangesAsync();
            }
        }
    }
}
