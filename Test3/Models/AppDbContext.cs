using Microsoft.EntityFrameworkCore;

namespace Test3.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<User> Users { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
