using Domain.DataModels.Complaints;
using Domain.DataModels.Intersections;
using Domain.DataModels.User;
using Domain.Resources;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Utilities.Zlib;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(
            DataContext context,
            UserManager<ApplicationUser> userManager
        )
        {
            using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                if (!userManager.Users.Any())
                {
                    int typeAdmin = 0,
                        typeWorker = 0,
                        typeUser = 0;

                    if (!context.UserTypes.Any())
                    {
                        var typeAdminEntity = await context.UserTypes.AddAsync(
                            new UserType { strName = ConstantsDB.UserTypes.Admin }
                        );

                        var typeWorkerEntity = await context.UserTypes.AddAsync(
                            new UserType { strName = ConstantsDB.UserTypes.Worker }
                        );

                        var typeUserEntity = await context.UserTypes.AddAsync(
                            new UserType { strName = ConstantsDB.UserTypes.User }
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
                            strFirstName = "admin",
                            strLastName = "admin",
                            strPhoneNumber = "0799999999",
                            strNationalId = "2000555333",
                            strNationalIdNumber = "RUX55333"
                        }
                    );
                    var infoWorker = await context.UserInfos.AddAsync(
                        new UserInfo
                        {
                            strFirstName = "worker",
                            strLastName = "worker",
                            strPhoneNumber = "0788888888",
                            strNationalId = "2000111222",
                            strNationalIdNumber = "RUX11222"
                        }
                    );
                    var infoUser = await context.UserInfos.AddAsync(
                        new UserInfo
                        {
                            strFirstName = "user",
                            strLastName = "user",
                            strPhoneNumber = "0777777777",
                            strNationalId = "2000666888",
                            strNationalIdNumber = "RUX66888"
                        }
                    );
                    await context.SaveChangesAsync();

                    // Create users AFTER awaiting info creation and types
                    var userAdmin = new ApplicationUser
                    {
                        UserName = "admin",
                        PhoneNumberConfirmed = true,
                        blnIsVerified = false,
                        blnIsActive = false,
                        blnIsBlacklisted = false,
                        intUserInfoId = infoAdmin.Entity.intId,
                        intUserTypeId = typeAdmin,
                    };

                    var userWorker = new ApplicationUser
                    {
                        UserName = "worker",
                        PhoneNumberConfirmed = true,
                        blnIsVerified = false,
                        blnIsActive = false,
                        blnIsBlacklisted = false,
                        intUserInfoId = infoWorker.Entity.intId,
                        intUserTypeId = typeWorker,
                    };

                    var userUser = new ApplicationUser
                    {
                        UserName = "user",
                        PhoneNumberConfirmed = true,
                        blnIsVerified = false,
                        blnIsActive = false,
                        blnIsBlacklisted = false,
                        intUserInfoId = infoUser.Entity.intId,
                        intUserTypeId = typeUser,
                    };

                    await userManager.CreateAsync(userAdmin, "Pass@123");
                    await userManager.CreateAsync(userWorker, "Pass@123");
                    await userManager.CreateAsync(userUser, "Pass@123");
                }

                if (!context.Complaints.Any())
                {
                    if (!context.ComplaintStatus.Any())
                    {
                        var complaintStatus = new List<ComplaintStatus>
                        {
                            new ComplaintStatus
                            {
                                strName = ConstantsDB.ComplaintStatusTypes.Pending
                            },
                            new ComplaintStatus
                            {
                                strName = ConstantsDB.ComplaintStatusTypes.Rejected
                            },
                            new ComplaintStatus
                            {
                                strName = ConstantsDB.ComplaintStatusTypes.Approved
                            },
                            new ComplaintStatus
                            {
                                strName = ConstantsDB.ComplaintStatusTypes.Scheduled
                            },
                            new ComplaintStatus
                            {
                                strName = ConstantsDB.ComplaintStatusTypes.InProgress
                            },
                            new ComplaintStatus
                            {
                                strName = ConstantsDB.ComplaintStatusTypes.WaitingEvaluation
                            },
                            new ComplaintStatus
                            {
                                strName = ConstantsDB.ComplaintStatusTypes.Completed
                            },
                            new ComplaintStatus
                            {
                                strName = ConstantsDB.ComplaintStatusTypes.ReFiled
                            }
                        };
                        await context.ComplaintStatus.AddRangeAsync(complaintStatus);
                    }
                    if (!context.ComplaintPrivacy.Any())
                    {
                        var complaintPrivacy = new List<ComplaintPrivacy>
                        {
                            new ComplaintPrivacy
                            {
                                strName = ConstantsDB.ComplaintPrivacyTypes.Private
                            },
                            new ComplaintPrivacy
                            {
                                strName = ConstantsDB.ComplaintPrivacyTypes.Public
                            },
                            new ComplaintPrivacy
                            {
                                strName = ConstantsDB.ComplaintPrivacyTypes.Any
                            },
                        };
                        await context.ComplaintPrivacy.AddRangeAsync(complaintPrivacy);
                    }

                    await context.SaveChangesAsync();

                    if (!context.ComplaintTypes.Any())
                    {
                        var complaintTypes = new List<ComplaintType>
                        {
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.WasteAccumulation.Ar,
                                ConstantsDB.ComplaintTypes.WasteAccumulation.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.ScatterWaste.Ar,
                                ConstantsDB.ComplaintTypes.ScatterWaste.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.TreePruningWaste.Ar,
                                ConstantsDB.ComplaintTypes.TreePruningWaste.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.CementSpeedBumps.Ar,
                                ConstantsDB.ComplaintTypes.CementSpeedBumps.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.ViolatingSpeedBumps.Ar,
                                ConstantsDB.ComplaintTypes.ViolatingSpeedBumps.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.WaterPools.Ar,
                                ConstantsDB.ComplaintTypes.WaterPools.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.BrokenWaterPipe.Ar,
                                ConstantsDB.ComplaintTypes.BrokenWaterPipe.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.StreetCracks.Ar,
                                ConstantsDB.ComplaintTypes.StreetCracks.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.Potholes.Ar,
                                ConstantsDB.ComplaintTypes.Potholes.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.SideSafetyRails.Ar,
                                ConstantsDB.ComplaintTypes.SideSafetyRails.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.MissingManholes.Ar,
                                ConstantsDB.ComplaintTypes.MissingManholes.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.LowerManholes.Ar,
                                ConstantsDB.ComplaintTypes.LowerManholes.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.HigherManholes.Ar,
                                ConstantsDB.ComplaintTypes.HigherManholes.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.IllegalSigns.Ar,
                                ConstantsDB.ComplaintTypes.IllegalSigns.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.BrokenSigns.Ar,
                                ConstantsDB.ComplaintTypes.BrokenSigns.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.BlockedSigns.Ar,
                                ConstantsDB.ComplaintTypes.BlockedSigns.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.StreetLightsOut.Ar,
                                ConstantsDB.ComplaintTypes.StreetLightsOut.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.BrokenWall.Ar,
                                ConstantsDB.ComplaintTypes.BrokenWall.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.BrokenPavement.Ar,
                                ConstantsDB.ComplaintTypes.BrokenPavement.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.Graffiti.Ar,
                                ConstantsDB.ComplaintTypes.Graffiti.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.ConstructionWaste.Ar,
                                ConstantsDB.ComplaintTypes.ConstructionWaste.En,
                                context
                            ),
                            CreateComplaintType(
                                ConstantsDB.ComplaintTypes.MaintenanceWaste.Ar,
                                ConstantsDB.ComplaintTypes.MaintenanceWaste.En,
                                context
                            ),
                        };
                        await context.ComplaintTypes.AddRangeAsync(complaintTypes);
                    }

                    await context.SaveChangesAsync();

                    var complaint = await context.Complaints.AddAsync(CreateComplaint(3));
                    var complaint1 = await context.Complaints.AddAsync(CreateComplaint(3));
                    var complaint2 = await context.Complaints.AddAsync(CreateComplaint(3));

                    await context.SaveChangesAsync();

                    await context.ComplaintAttachments.AddAsync(
                        CreateComplaintAttachment(
                            complaint.Entity.intId,
                            @"C:\Fake\Path\Files\test.jpg"
                        )
                    );
                    await context.ComplaintAttachments.AddAsync(
                        CreateComplaintAttachment(
                            complaint1.Entity.intId,
                            @"C:\Fake\Path\Files\test1.jpg"
                        )
                    );
                    await context.ComplaintAttachments.AddAsync(
                        CreateComplaintAttachment(
                            complaint2.Entity.intId,
                            @"C:\Fake\Path\Files\test2.jpg"
                        )
                    );

                    await context.SaveChangesAsync();
                }
                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
            }
        }

        private static ComplaintType CreateComplaintType(
            string strAr,
            string strEn,
            DataContext context
        )
        {
            return new ComplaintType
            {
                intDepartmentId = 1,
                strNameAr = strAr,
                strNameEn = strEn,
                decGrade = 1.0M,
                intPrivacyId = context.ComplaintPrivacy
                    .Where(q => q.strName == "any")
                    .FirstOrDefault()
                    .intId,
                intCreatedBy = 1,
                dtmDateCreated = DateTime.Now,
                intLastModifiedBy = 1,
                dtmDateLastModified = DateTime.Now,
                blnIsDeleted = false,
            };
        }

        private static Complaint CreateComplaint(int userId)
        {
            return new Complaint
            {
                intUserID = userId,
                intTypeId = 1,
                intStatusId = 1,
                strComment = "",
                intReminder = 1,
                dtmDateLastModified = DateTime.Now,
                dtmDateLastReminded = DateTime.Now,
                intLastModifiedBy = 1,
                dtmDateCreated = DateTime.Now,
            };
        }

        private static ComplaintAttachment CreateComplaintAttachment(
            int complaintId,
            string mediaRef
        )
        {
            return new ComplaintAttachment
            {
                intComplaintId = complaintId,
                strMediaRef = mediaRef,
                decLat = 32.894555M,
                decLng = 38.264984M,
                blnIsVideo = false,
            };
        }
    }
}
