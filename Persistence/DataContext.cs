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

            // Users Table
            builder
                .Entity<ApplicationUser>()
                .Ignore(q => q.Email)
                .Ignore(q => q.EmailConfirmed)
                .Ignore(q => q.NormalizedEmail)
                .Ignore(q => q.TwoFactorEnabled);

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
