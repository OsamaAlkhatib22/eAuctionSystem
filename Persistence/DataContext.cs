using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Domain.DataModels.Categories;
using Domain.DataModels.Users;
using Domain.DataModels.Reviews;
using Domain.DataModels.Transactions;
using Domain.DataModels.Services;
using Domain.DataModels.UserRating;

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
                 //b.Property(e => e.PhoneNumberConfirmed).HasColumnName("IS_CONFIRMED");
                 b.Property(e => e.PasswordHash).HasColumnName("PASSWORD_HASH");
                 b.Property(e => e.SecurityStamp).HasColumnName("SECURITY_STAMP");
                 b.Property(e => e.ConcurrencyStamp).HasColumnName("CONCURRENCY_STAMP");
             });
            /*
             builder.Entity<IdentityUserClaim<int>>(b =>
             {
                 b.ToTable("users_claims");
                 b.Property(e => e.Id).HasColumnName("ID");
                 b.Property(e => e.UserId).HasColumnName("USER_ID");
                 b.Property(e => e.ClaimType).HasColumnName("CLAIM_TYPE");
                 b.Property(e => e.ClaimValue).HasColumnName("CLAIM_VALUE");
             });

             builder.Entity<IdentityRole<int>>(b =>
             {
                 b.ToTable("roles");
                 b.Property(e => e.Id).HasColumnName("ID");
                 b.Property(e => e.Name).HasColumnName("NAME");
                 b.Property(e => e.NormalizedName).HasColumnName("NORMALIZED_NAME");
                 b.Property(e => e.ConcurrencyStamp).HasColumnName("CONCURRENCY_STAMP");
             });

             builder.Entity<IdentityRoleClaim<int>>(b =>
             {
                 b.ToTable("roles_claims");
                 b.Property(e => e.Id).HasColumnName("ID");
                 b.Property(e => e.RoleId).HasColumnName("ROLE_ID");
                 b.Property(e => e.ClaimType).HasColumnName("CLAIM_TYPE");
                 b.Property(e => e.ClaimValue).HasColumnName("CLAIM_VALUE");
             });

             builder.Entity<IdentityUserRole<int>>(b =>
             {
                 b.ToTable("users_roles");
                 b.Property(e => e.UserId).HasColumnName("USER_ID");
                 b.Property(e => e.RoleId).HasColumnName("ROLE_ID");
             });

             builder.Entity<IdentityUserLogin<int>>(b =>
             {
                 b.ToTable("users_login");
                 b.Property(e => e.UserId).HasColumnName("USER_ID");
                 b.Property(e => e.LoginProvider).HasColumnName("LOGIN_PROVIDER");
                 b.Property(e => e.ProviderKey).HasColumnName("PROVIDER_KEY");
                 b.Property(e => e.ProviderDisplayName).HasColumnName("PROVIDER_DISPLAY_NAME");
             });

             builder.Entity<IdentityUserToken<int>>(b =>
             {
                 b.ToTable("users_tokens");
                 b.Property(e => e.UserId).HasColumnName("USER_ID");
                 b.Property(e => e.LoginProvider).HasColumnName("LOGIN_PROVIDER");
                 b.Property(e => e.Name).HasColumnName("NAME");
                 b.Property(e => e.Value).HasColumnName("VALUE");
             });
            */
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
                b.Property(e => e.TransactionId).HasColumnName("transaction_id");
                b.Property(e => e.ServiceId).HasColumnName("service_id");
                b.Property(e => e.BuyerId).HasColumnName("buyer_id");
                b.Property(e => e.BidderId).HasColumnName("Bidder_id");
                b.Property(e => e.TransactionDate).HasColumnName("transaction_date");
                b.Property(e => e.Amount).HasColumnName("amount");
            });
            builder.Entity<Service>(b =>
            {
                b.ToTable("Services");
                b.Property(e => e.ServiceId).HasColumnName("service_id");
                b.Property(e => e.UserId).HasColumnName("UserId");
                b.Property(e => e.Title).HasColumnName("Title");
                b.Property(e => e.Description).HasColumnName("Description");
                b.Property(e => e.starting_bid).HasColumnName("starting_bid");
                b.Property(e => e.BidDuration).HasColumnName("Bid_Duration");
                b.Property(e => e.CategoryId).HasColumnName("category_id");
                b.Property(e => e.CreationDate).HasColumnName("creation_date");
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
            builder.Entity<UserSkill>(b => {
                b.ToTable("UserSkill");
                b.Property(e => e.UserId).HasColumnName("UserId");
                b.Property(e => e.Skills).HasColumnName("Skills");
            });
            builder.Entity<TaskAttachment>(b => {
                b.ToTable("TaskAttachment");
                b.Property(e => e.ServiceId).HasColumnName("service_id");
                b.Property(e => e.MediaRef).HasColumnName("media_ref");
                b.Property(e => e.DateCreated).HasColumnName("date_created");
            });

           

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
       
    }
}
