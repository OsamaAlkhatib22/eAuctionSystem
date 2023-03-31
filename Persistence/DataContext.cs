using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Domain.DataModels.User;
using Domain.DataModels.Complaints;

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
                b.Property(e => e.Id).HasColumnName("ID");
                b.Property(e => e.UserName).HasColumnName("USER_NAME");
                b.Property(e => e.NormalizedUserName).HasColumnName("NORMALIZED_USER_NAME");
                b.Property(e => e.PhoneNumberConfirmed).HasColumnName("IS_CONFIRMED");
                b.Property(e => e.PasswordHash).HasColumnName("PASSWORD_HASH");
                b.Property(e => e.SecurityStamp).HasColumnName("SECURITY_STAMP");
                b.Property(e => e.ConcurrencyStamp).HasColumnName("CONCURRENCY_STAMP");
                b.Property(e => e.LockoutEnd).HasColumnName("LOCKOUT_END");
                b.Property(e => e.AccessFailedCount).HasColumnName("ACCESS_FAILED_COUNT");
            });

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

            // Ignore properties
            builder
                .Entity<ApplicationUser>()
                .Ignore(q => q.Email)
                .Ignore(q => q.EmailConfirmed)
                .Ignore(q => q.PhoneNumber)
                .Ignore(q => q.NormalizedEmail)
                .Ignore(q => q.TwoFactorEnabled)
                .Ignore(q => q.LockoutEnabled);

            // Complaints Table
            builder.Entity<Complaint>().Property(q => q.decLat).HasPrecision(8, 6);
            builder.Entity<Complaint>().Property(q => q.decLng).HasPrecision(8, 6);

            // Complaint_Voters intersection table
            builder.Entity<ComplaintVoters>(
                q => q.HasKey(q => new { q.intUserId, q.intComplaintId })
            );
            builder
                .Entity<ComplaintVoters>()
                .HasOne(q => q.User)
                .WithMany(q => q.Complaints)
                .HasForeignKey(q => q.intUserId);
            builder
                .Entity<ComplaintVoters>()
                .HasOne(q => q.Complaint)
                .WithMany(q => q.Voters)
                .HasForeignKey(q => q.intComplaintId);
        }

        // Complaints DataSets
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<ComplaintVoters> ComplaintVoters { get; set; }
        public DbSet<ComplaintStatus> ComplaintStatus { get; set; }
        public DbSet<ComplaintPrivacy> ComplaintPrivacy { get; set; }
        public DbSet<ComplaintType> ComplaintTypes { get; set; }

        // Users DataSets
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<UserInfo> UserInfos { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
    }
}
