using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Complaint>().Property(q => q.decLat).HasPrecision(8, 6);
            modelBuilder.Entity<Complaint>().Property(q => q.decLng).HasPrecision(8, 6);

        }

        public DbSet<Complaint> Complaints { get; set; }
    }
}
