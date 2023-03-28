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

            builder
                .Entity<ApplicationUser>()
                .Ignore(q => q.Email)
                .Ignore(q => q.EmailConfirmed)
                .Ignore(q => q.NormalizedEmail)
                .Ignore(q => q.TwoFactorEnabled);

            builder.Entity<Complaint>().Property(q => q.decLat).HasPrecision(8, 6);
            builder.Entity<Complaint>().Property(q => q.decLng).HasPrecision(8, 6);
        }

        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<UserInfo> UserInfos { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
    }
}
