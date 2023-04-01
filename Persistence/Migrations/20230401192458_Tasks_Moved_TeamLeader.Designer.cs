﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230401192458_Tasks_Moved_TeamLeader")]
    partial class Tasks_Moved_TeamLeader
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Domain.DataModels.Complaints.Complaint", b =>
                {
                    b.Property<int>("intId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<DateTime>("dtmDateCreated")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_CREATED");

                    b.Property<DateTime>("dtmDateLastModified")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_LAST_MODIFIED");

                    b.Property<DateTime>("dtmDateLastReminded")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_LAST_REMINDED");

                    b.Property<int>("intLastModifiedBy")
                        .HasColumnType("int")
                        .HasColumnName("LAST_MODIFIED_BY");

                    b.Property<int>("intReminder")
                        .HasColumnType("int")
                        .HasColumnName("REMINDER");

                    b.Property<int>("intStatusId")
                        .HasColumnType("int")
                        .HasColumnName("STATUS_ID");

                    b.Property<int>("intTypeId")
                        .HasColumnType("int")
                        .HasColumnName("TYPE_ID");

                    b.Property<int>("intUserID")
                        .HasColumnType("int")
                        .HasColumnName("USER_ID");

                    b.Property<string>("strComment")
                        .HasColumnType("longtext")
                        .HasColumnName("COMMENT");

                    b.HasKey("intId");

                    b.HasIndex("intStatusId");

                    b.HasIndex("intTypeId");

                    b.ToTable("complaints");
                });

            modelBuilder.Entity("Domain.DataModels.Complaints.ComplaintPrivacy", b =>
                {
                    b.Property<int>("intId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<string>("strName")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("NAME");

                    b.HasKey("intId");

                    b.ToTable("complaints_privacy");
                });

            modelBuilder.Entity("Domain.DataModels.Complaints.ComplaintStatus", b =>
                {
                    b.Property<int>("intId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<string>("strName")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("NAME");

                    b.HasKey("intId");

                    b.ToTable("complaints_status");
                });

            modelBuilder.Entity("Domain.DataModels.Complaints.ComplaintType", b =>
                {
                    b.Property<int>("intId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<bool>("blnIsDeleted")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("IS_DELETED");

                    b.Property<decimal>("decGrade")
                        .HasColumnType("decimal(18,2)")
                        .HasColumnName("GRADE");

                    b.Property<DateTime>("dtmDateCreated")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_CREATED");

                    b.Property<DateTime>("dtmDateLastModified")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_LAST_MODIFIED");

                    b.Property<int>("intCreatedBy")
                        .HasColumnType("int")
                        .HasColumnName("CREATED_BY");

                    b.Property<int>("intDepartmentId")
                        .HasColumnType("int")
                        .HasColumnName("DEPARTMENT_ID");

                    b.Property<int>("intLastModifiedBy")
                        .HasColumnType("int")
                        .HasColumnName("LAST_MODIFIED_BY");

                    b.Property<int>("intPrivacyId")
                        .HasColumnType("int")
                        .HasColumnName("PRIVACY_ID");

                    b.Property<string>("strNameAr")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("NAME_AR");

                    b.Property<string>("strNameEn")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("NAME_EN");

                    b.HasKey("intId");

                    b.HasIndex("intPrivacyId");

                    b.ToTable("complaints_types");
                });

            modelBuilder.Entity("Domain.DataModels.Intersections.ComplaintAttachment", b =>
                {
                    b.Property<int>("intComplaintId")
                        .HasColumnType("int")
                        .HasColumnName("COMPLAINT_ID");

                    b.Property<string>("strMediaRef")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("MEDIA_REF");

                    b.Property<bool>("blnIsVideo")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("IS_VIDEO");

                    b.Property<decimal>("decLat")
                        .HasPrecision(8, 6)
                        .HasColumnType("decimal(8,6)")
                        .HasColumnName("LAT");

                    b.Property<decimal>("decLng")
                        .HasPrecision(8, 6)
                        .HasColumnType("decimal(8,6)")
                        .HasColumnName("LNG");

                    b.Property<DateTime>("dtmDateCreated")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_CREATED");

                    b.Property<int>("intCreatedBy")
                        .HasColumnType("int")
                        .HasColumnName("CREATED_BY");

                    b.HasKey("intComplaintId", "strMediaRef");

                    b.ToTable("complaints_attachments");
                });

            modelBuilder.Entity("Domain.DataModels.Intersections.ComplaintVoters", b =>
                {
                    b.Property<int>("intUserId")
                        .HasColumnType("int")
                        .HasColumnName("USER_ID");

                    b.Property<int>("intComplaintId")
                        .HasColumnType("int")
                        .HasColumnName("COMPLAINT_ID");

                    b.Property<bool>("blnIsHost")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("IS_HOST");

                    b.HasKey("intUserId", "intComplaintId");

                    b.HasIndex("intComplaintId");

                    b.ToTable("complaints_voters");
                });

            modelBuilder.Entity("Domain.DataModels.Intersections.WorkTaskAttachment", b =>
                {
                    b.Property<int>("intTaskId")
                        .HasColumnType("int")
                        .HasColumnName("TASK_ID");

                    b.Property<string>("strMediaRef")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("MEDIA_REF");

                    b.Property<bool>("blnIsVideo")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("IS_VIDEO");

                    b.Property<DateTime>("dtmDateCreated")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_CREATED");

                    b.Property<int>("intCreatedBy")
                        .HasColumnType("int")
                        .HasColumnName("CREATED_BY");

                    b.HasKey("intTaskId", "strMediaRef");

                    b.ToTable("tasks_attachments");
                });

            modelBuilder.Entity("Domain.DataModels.Intersections.WorkTaskComplaints", b =>
                {
                    b.Property<int>("intTaskId")
                        .HasColumnType("int")
                        .HasColumnName("TASK_ID");

                    b.Property<int>("intComplaintId")
                        .HasColumnType("int")
                        .HasColumnName("COMPLAINT_ID");

                    b.HasKey("intTaskId", "intComplaintId");

                    b.HasIndex("intComplaintId");

                    b.ToTable("tasks_complaints");
                });

            modelBuilder.Entity("Domain.DataModels.Intersections.WorkTaskMembers", b =>
                {
                    b.Property<int>("intWrokerId")
                        .HasColumnType("int")
                        .HasColumnName("USER_ID");

                    b.Property<int>("intTaskId")
                        .HasColumnType("int")
                        .HasColumnName("TASK_ID");

                    b.Property<bool>("blnIsLeader")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("IS_LEADER");

                    b.HasKey("intWrokerId", "intTaskId");

                    b.HasIndex("intTaskId");

                    b.ToTable("tasks_members");
                });

            modelBuilder.Entity("Domain.DataModels.Tasks.WorkTask", b =>
                {
                    b.Property<int>("intId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<bool>("blnIsDeleted")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("IS_DELETED");

                    b.Property<decimal>("decCost")
                        .HasColumnType("decimal(18,2)")
                        .HasColumnName("COST");

                    b.Property<decimal>("decRating")
                        .HasColumnType("decimal(18,2)")
                        .HasColumnName("RATING");

                    b.Property<DateTime>("dtmDateActivated")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_ACTIVATED");

                    b.Property<DateTime>("dtmDateCreated")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_CREATED");

                    b.Property<DateTime>("dtmDateDeadline")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_DEADLINE");

                    b.Property<DateTime>("dtmDateFinished")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_FINISHED");

                    b.Property<DateTime>("dtmDateLastModified")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_LAST_MODIFIED");

                    b.Property<DateTime>("dtmDateScheduled")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_SCHEDULED");

                    b.Property<int>("intAdminId")
                        .HasColumnType("int")
                        .HasColumnName("ADMIN_ID");

                    b.Property<int>("intLastModifiedBy")
                        .HasColumnType("int")
                        .HasColumnName("LAST_MODIFIED_BY");

                    b.Property<int>("intStatusId")
                        .HasColumnType("int")
                        .HasColumnName("STATUS_ID");

                    b.Property<int>("intTypeId")
                        .HasColumnType("int")
                        .HasColumnName("TYPE_ID");

                    b.Property<string>("strComment")
                        .HasColumnType("longtext")
                        .HasColumnName("COMMENT");

                    b.HasKey("intId");

                    b.HasIndex("intAdminId");

                    b.HasIndex("intStatusId");

                    b.HasIndex("intTypeId");

                    b.ToTable("tasks");
                });

            modelBuilder.Entity("Domain.DataModels.Tasks.WorkTaskStatus", b =>
                {
                    b.Property<int>("intId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<string>("strName")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("NAME");

                    b.HasKey("intId");

                    b.ToTable("tasks_status");
                });

            modelBuilder.Entity("Domain.DataModels.Tasks.WorkTaskType", b =>
                {
                    b.Property<int>("intId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<bool>("blnIsDeleted")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("IS_DELETED");

                    b.Property<DateTime>("dtmDateCreated")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_CREATED");

                    b.Property<DateTime>("dtmDateLastModified")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_LAST_MODIFIED");

                    b.Property<int>("intCreatedBy")
                        .HasColumnType("int")
                        .HasColumnName("CREATED_BY");

                    b.Property<int>("intDepartmentId")
                        .HasColumnType("int")
                        .HasColumnName("DEPARTMENT_ID");

                    b.Property<int>("intLastModifiedBy")
                        .HasColumnType("int")
                        .HasColumnName("LAST_MODIFIED_BY");

                    b.Property<string>("strNameAr")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("NAME_AR");

                    b.Property<string>("strNameEn")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("NAME_EN");

                    b.HasKey("intId");

                    b.ToTable("tasks_types");
                });

            modelBuilder.Entity("Domain.DataModels.User.ApplicationUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int")
                        .HasColumnName("ACCESS_FAILED_COUNT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext")
                        .HasColumnName("CONCURRENCY_STAMP");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("LOCKOUT_END");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)")
                        .HasColumnName("NORMALIZED_USER_NAME");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext")
                        .HasColumnName("PASSWORD_HASH");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("IS_CONFIRMED");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext")
                        .HasColumnName("SECURITY_STAMP");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)")
                        .HasColumnName("USER_NAME");

                    b.Property<bool>("blnIsActive")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("IS_ACTIVE");

                    b.Property<bool>("blnIsBlacklisted")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("IS_BLACKLISTED");

                    b.Property<bool>("blnIsVerified")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("IS_VERIFIED");

                    b.Property<int>("intGroupId")
                        .HasColumnType("int")
                        .HasColumnName("GROUP_ID");

                    b.Property<int>("intUserInfoId")
                        .HasColumnType("int")
                        .HasColumnName("USER_INFO_ID");

                    b.Property<int>("intUserTypeId")
                        .HasColumnType("int")
                        .HasColumnName("USER_TYPE_ID");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.HasIndex("intUserInfoId")
                        .IsUnique();

                    b.HasIndex("intUserTypeId");

                    b.ToTable("users", (string)null);
                });

            modelBuilder.Entity("Domain.DataModels.User.UserInfo", b =>
                {
                    b.Property<int>("intId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<string>("strFirstName")
                        .HasColumnType("longtext")
                        .HasColumnName("FIRST_NAME");

                    b.Property<string>("strLastName")
                        .HasColumnType("longtext")
                        .HasColumnName("LAST_NAME");

                    b.Property<string>("strNationalId")
                        .HasColumnType("longtext")
                        .HasColumnName("NATIONAL_ID");

                    b.Property<string>("strNationalIdNumber")
                        .HasColumnType("longtext")
                        .HasColumnName("NATIONAL_ID_NUMBER");

                    b.Property<string>("strPassportNumber")
                        .HasColumnType("longtext")
                        .HasColumnName("PASSPORT_NUMBER");

                    b.Property<string>("strPhoneNumber")
                        .HasColumnType("longtext")
                        .HasColumnName("PHONE_NUMBER");

                    b.Property<string>("strRegistrationNumber")
                        .HasColumnType("longtext")
                        .HasColumnName("REGISTRATION_NUMBER");

                    b.HasKey("intId");

                    b.ToTable("users_info");
                });

            modelBuilder.Entity("Domain.DataModels.User.UserType", b =>
                {
                    b.Property<int>("intId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<string>("strName")
                        .HasColumnType("longtext")
                        .HasColumnName("NAME");

                    b.HasKey("intId");

                    b.ToTable("users_types");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext")
                        .HasColumnName("CONCURRENCY_STAMP");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)")
                        .HasColumnName("NAME");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)")
                        .HasColumnName("NORMALIZED_NAME");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("roles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext")
                        .HasColumnName("CLAIM_TYPE");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext")
                        .HasColumnName("CLAIM_VALUE");

                    b.Property<int>("RoleId")
                        .HasColumnType("int")
                        .HasColumnName("ROLE_ID");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("roles_claims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext")
                        .HasColumnName("CLAIM_TYPE");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext")
                        .HasColumnName("CLAIM_VALUE");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("USER_ID");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("users_claims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("LOGIN_PROVIDER");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("PROVIDER_KEY");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext")
                        .HasColumnName("PROVIDER_DISPLAY_NAME");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("USER_ID");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("users_login", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("USER_ID");

                    b.Property<int>("RoleId")
                        .HasColumnType("int")
                        .HasColumnName("ROLE_ID");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("users_roles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("USER_ID");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("LOGIN_PROVIDER");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("NAME");

                    b.Property<string>("Value")
                        .HasColumnType("longtext")
                        .HasColumnName("VALUE");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("users_tokens", (string)null);
                });

            modelBuilder.Entity("Domain.DataModels.Complaints.Complaint", b =>
                {
                    b.HasOne("Domain.DataModels.Complaints.ComplaintStatus", "Status")
                        .WithMany()
                        .HasForeignKey("intStatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.DataModels.Complaints.ComplaintType", "ComplaintType")
                        .WithMany()
                        .HasForeignKey("intTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ComplaintType");

                    b.Navigation("Status");
                });

            modelBuilder.Entity("Domain.DataModels.Complaints.ComplaintType", b =>
                {
                    b.HasOne("Domain.DataModels.Complaints.ComplaintPrivacy", "Privacy")
                        .WithMany()
                        .HasForeignKey("intPrivacyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Privacy");
                });

            modelBuilder.Entity("Domain.DataModels.Intersections.ComplaintAttachment", b =>
                {
                    b.HasOne("Domain.DataModels.Complaints.Complaint", "Complaint")
                        .WithMany("Attachments")
                        .HasForeignKey("intComplaintId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Complaint");
                });

            modelBuilder.Entity("Domain.DataModels.Intersections.ComplaintVoters", b =>
                {
                    b.HasOne("Domain.DataModels.Complaints.Complaint", "Complaint")
                        .WithMany("Voters")
                        .HasForeignKey("intComplaintId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.DataModels.User.ApplicationUser", "User")
                        .WithMany("Complaints")
                        .HasForeignKey("intUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Complaint");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.DataModels.Intersections.WorkTaskAttachment", b =>
                {
                    b.HasOne("Domain.DataModels.Tasks.WorkTask", "Task")
                        .WithMany("Attachments")
                        .HasForeignKey("intTaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Task");
                });

            modelBuilder.Entity("Domain.DataModels.Intersections.WorkTaskComplaints", b =>
                {
                    b.HasOne("Domain.DataModels.Complaints.Complaint", "Complaint")
                        .WithMany("Tasks")
                        .HasForeignKey("intComplaintId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.DataModels.Tasks.WorkTask", "Task")
                        .WithMany("Complaints")
                        .HasForeignKey("intTaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Complaint");

                    b.Navigation("Task");
                });

            modelBuilder.Entity("Domain.DataModels.Intersections.WorkTaskMembers", b =>
                {
                    b.HasOne("Domain.DataModels.Tasks.WorkTask", "Task")
                        .WithMany("Workers")
                        .HasForeignKey("intTaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.DataModels.User.ApplicationUser", "Worker")
                        .WithMany("Tasks")
                        .HasForeignKey("intWrokerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Task");

                    b.Navigation("Worker");
                });

            modelBuilder.Entity("Domain.DataModels.Tasks.WorkTask", b =>
                {
                    b.HasOne("Domain.DataModels.User.ApplicationUser", "Admin")
                        .WithMany()
                        .HasForeignKey("intAdminId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.DataModels.Tasks.WorkTaskStatus", "Status")
                        .WithMany()
                        .HasForeignKey("intStatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.DataModels.Tasks.WorkTaskType", "TaskType")
                        .WithMany()
                        .HasForeignKey("intTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Admin");

                    b.Navigation("Status");

                    b.Navigation("TaskType");
                });

            modelBuilder.Entity("Domain.DataModels.User.ApplicationUser", b =>
                {
                    b.HasOne("Domain.DataModels.User.UserInfo", "UserInfo")
                        .WithOne("User")
                        .HasForeignKey("Domain.DataModels.User.ApplicationUser", "intUserInfoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.DataModels.User.UserType", "UserType")
                        .WithMany("Users")
                        .HasForeignKey("intUserTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("UserInfo");

                    b.Navigation("UserType");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole<int>", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("Domain.DataModels.User.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("Domain.DataModels.User.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole<int>", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.DataModels.User.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("Domain.DataModels.User.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.DataModels.Complaints.Complaint", b =>
                {
                    b.Navigation("Attachments");

                    b.Navigation("Tasks");

                    b.Navigation("Voters");
                });

            modelBuilder.Entity("Domain.DataModels.Tasks.WorkTask", b =>
                {
                    b.Navigation("Attachments");

                    b.Navigation("Complaints");

                    b.Navigation("Workers");
                });

            modelBuilder.Entity("Domain.DataModels.User.ApplicationUser", b =>
                {
                    b.Navigation("Complaints");

                    b.Navigation("Tasks");
                });

            modelBuilder.Entity("Domain.DataModels.User.UserInfo", b =>
                {
                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.DataModels.User.UserType", b =>
                {
                    b.Navigation("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
