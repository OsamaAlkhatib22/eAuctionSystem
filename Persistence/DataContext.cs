using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Domain.DataModels.Categories;
using Domain.DataModels.Users;
using Domain.DataModels.Reviews;
using Domain.DataModels.Transactions;
using Domain.DataModels.Services;
using Domain.DataModels.UserRating;
using Domain.DataModels.Skills;

namespace Persistence
{
    public class DataContext : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>
    {
        public DataContext(DbContextOptions options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Change table names
             builder.Entity<ApplicationUser>(b =>
             {
                 b.ToTable("users");
                 b.Property(e => e.Id).HasColumnName("UserId");
                 b.Property(e => e.UserName).HasColumnName("UserName");
                 b.Property(e => e.UserTypeId).HasColumnName("user_type_id");
                 b.Property(e => e.PasswordHash).HasColumnName("PASSWORD_HASH");
                 b.Property(e => e.SecurityStamp).HasColumnName("SECURITY_STAMP");
                 b.Property(e => e.ConcurrencyStamp).HasColumnName("CONCURRENCY_STAMP");
             });
           
            // Ignore properties
            builder
                .Entity<ApplicationUser>()
                //.Ignore(q => q.Email)
                .Ignore(q => q.PhoneNumberConfirmed)
                .Ignore(q => q.EmailConfirmed)
                .Ignore(q => q.PhoneNumber)
                .Ignore(q => q.NormalizedEmail)
                .Ignore(q => q.TwoFactorEnabled)
                .Ignore(q => q.LockoutEnabled)
                //.Ignore(q => q.UserName)
                //.Ignore(q => q.NormalizedUserName)
                .Ignore(q => q.LockoutEnd)
                .Ignore(q => q.AccessFailedCount);

            builder.Entity<Category>(b =>
            {
                b.ToTable("Categories");
                b.Property(e => e.intId).HasColumnName("category_id");
                b.Property(e => e.strCategoryName).HasColumnName("category_name");
               
            });
            builder.Entity<Review>(b =>
            {
                b.ToTable("Reviews");
                b.Property(e => e.ReviewId).HasColumnName("review_id");
                b.Property(e => e.ServiceId).HasColumnName("service_id");
                b.Property(e => e.UserId).HasColumnName("UserId");
                b.Property(e => e.Rating).HasColumnName("Rating");
                b.Property(e => e.Comment).HasColumnName("Comment");
                b.Property(e => e.ReviewDate).HasColumnName("review_date");
            });
            builder.Entity<Transaction>(b =>
            {
                b.ToTable("Transactions");
                b.Property(e => e.TransactionId).HasColumnName("Transaction_id");
                b.Property(e => e.UserId).HasColumnName("UserId");
                b.Property(e => e.TransactionType).HasColumnName("Transaction_Type");
                b.Property(e => e.TransactionDate).HasColumnName("Transaction_date");
                b.Property(e => e.Amount).HasColumnName("Amount");
            });
            builder.Entity<Service>(b =>
            {
                b.ToTable("Services");
                b.Property(e => e.ServiceId).HasColumnName("service_id");
                b.Property(e => e.UserId).HasColumnName("UserId");
                b.Property(e => e.Title).HasColumnName("Title");
                b.Property(e => e.Description).HasColumnName("Description");
                b.Property(e => e.starting_bid).HasColumnName("Budget");
                b.Property(e => e.BidDuration).HasColumnName("Bid_Duration");
                b.Property(e => e.CategoryId).HasColumnName("category_id");
                b.Property(e => e.CreationDate).HasColumnName("creation_date");
                b.Property(e => e.status).HasColumnName("Status");
            });
            builder.Entity<UserRating>(b =>
            {
                b.ToTable("UserRating");
                b.Property(e => e.UserId).HasColumnName("UserId");
                b.Property(e => e.Rating).HasColumnName("Rating");
            });
            builder.Entity<Bids>(b => {
                b.ToTable("Bids");
                b.Property(e => e.BidId).HasColumnName("Bid_id");
                b.Property(e => e.BidderId).HasColumnName("Bidder_id");
                b.Property(e => e.ServiceId).HasColumnName("service_id");
                b.Property(e => e.UserId).HasColumnName("UserId");
                b.Property(e => e.BidAmount).HasColumnName("Bid_Amount");
                b.Property(e => e.IsAccepted).HasColumnName("IsAccepted");
            });
            builder.Entity<Wallet>(b => {
                b.ToTable("Wallet");
                b.Property(e => e.UserId).HasColumnName("user_id");
                b.Property(e => e.Balance).HasColumnName("Balance");
            });
            builder.Entity<UserType>(b => {
                b.ToTable("UserType");
                b.Property(e => e.UserTypeId).HasColumnName("user_type_id");
                b.Property(e => e.Type).HasColumnName("Type");
            });
           /* builder.Entity<UserSkill>(b => {
                b.ToTable("UserSkill");
                b.Property(e => e.UserId).HasColumnName("UserId");
                b.Property(e => e.skillId).HasColumnName("skill_id");
            });
            builder.Entity<TaskAttachment>(b => {
                b.ToTable("TaskAttachment");
                b.Property(e => e.ServiceId).HasColumnName("service_id");
                b.Property(e => e.MediaRef).HasColumnName("media_ref");
                b.Property(e => e.DateCreated).HasColumnName("date_created");
            });*/
            builder.Entity<Skills>(b => {
                b.ToTable("Skills");
                b.Property(e => e.Skill).HasColumnName("Skills");
                b.Property(e => e.skillId).HasColumnName("skill_id");
            });
            builder.Entity<TaskSkills>(b => {
                b.ToTable("TaskSkills");
                b.Property(e => e.skillId).HasColumnName("skill_id");
                b.Property(e => e.ServiceId).HasColumnName("service_id");
            });



            //intersections


            builder.Entity<UserSkill>(
               q => q.HasKey(q => new { q.UserId, q.skillId })
           );

            builder.Entity<TaskAttachment>(
               q => q.HasKey(q => new { q.ServiceId, q.MediaRef })
           );


        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<UserRating> UserRatings { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Bids> Bids { get; set; }
        public DbSet<Wallet> Wallets { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
        public DbSet<UserSkill> UserSkills { get; set; }
        public DbSet<TaskAttachment> TaskAttachments { get; set; }
        public DbSet<Skills> Skillss { get; set; }
        public DbSet<TaskSkills> TaskSkills { get; set; }
       
    }
}
