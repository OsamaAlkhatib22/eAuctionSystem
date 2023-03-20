﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Domain.Complaint", b =>
                {
                    b.Property<int>("intId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID");

                    b.Property<decimal>("decLat")
                        .HasPrecision(8, 6)
                        .HasColumnType("decimal(8,6)")
                        .HasColumnName("LAT");

                    b.Property<decimal>("decLng")
                        .HasPrecision(8, 6)
                        .HasColumnType("decimal(8,6)")
                        .HasColumnName("LNG");

                    b.Property<DateTime>("dtmDateLastModified")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_LAST_MODIFIED");

                    b.Property<DateTime>("dtmDateLastReminded")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_LAST_REMINDED");

                    b.Property<DateTime>("dtmDateSubmitted")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("DATE_SUBMITTED");

                    b.Property<int>("intLastModifiedBy")
                        .HasColumnType("int")
                        .HasColumnName("LAST_MODIFIED_BY");

                    b.Property<int>("intReminder")
                        .HasColumnType("int")
                        .HasColumnName("REMINDER");

                    b.Property<int>("intStatus")
                        .HasColumnType("int")
                        .HasColumnName("STATUS");

                    b.Property<int>("intType")
                        .HasColumnType("int")
                        .HasColumnName("TYPE");

                    b.Property<int>("intUserID")
                        .HasColumnType("int")
                        .HasColumnName("USER_ID");

                    b.Property<string>("strComment")
                        .HasColumnType("longtext")
                        .HasColumnName("COMMENT");

                    b.Property<string>("strImageRef")
                        .IsRequired()
                        .HasColumnType("longtext")
                        .HasColumnName("IMAGE_REF");

                    b.HasKey("intId");

                    b.ToTable("complaints");
                });

            modelBuilder.Entity("Domain.DataModels.ApplicationUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

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

                    b.Property<int>("intUserInfo")
                        .HasColumnType("int")
                        .HasColumnName("USER_INFO");

                    b.Property<int>("intUserType")
                        .HasColumnType("int")
                        .HasColumnName("USER_TYPE");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.HasIndex("intUserInfo")
                        .IsUnique();

                    b.HasIndex("intUserType");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Domain.DataModels.UserInfo", b =>
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

                    b.Property<string>("strRegistrationNumber")
                        .HasColumnType("longtext")
                        .HasColumnName("REGISTRATION_NUMBER");

                    b.HasKey("intId");

                    b.ToTable("users_info");
                });

            modelBuilder.Entity("Domain.DataModels.UserType", b =>
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
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Value")
                        .HasColumnType("longtext");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Domain.DataModels.ApplicationUser", b =>
                {
                    b.HasOne("Domain.DataModels.UserInfo", "UserInfo")
                        .WithOne("User")
                        .HasForeignKey("Domain.DataModels.ApplicationUser", "intUserInfo")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.DataModels.UserType", "UserType")
                        .WithMany("Users")
                        .HasForeignKey("intUserType")
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
                    b.HasOne("Domain.DataModels.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("Domain.DataModels.ApplicationUser", null)
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

                    b.HasOne("Domain.DataModels.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("Domain.DataModels.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.DataModels.UserInfo", b =>
                {
                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.DataModels.UserType", b =>
                {
                    b.Navigation("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
