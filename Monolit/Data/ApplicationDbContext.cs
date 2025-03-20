using Microsoft.EntityFrameworkCore;
using Monolit.Models;

namespace Monolit.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<Reply> Replies { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<TicketType> TicketTypes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<InstalledEnvironment> InstalledEnvironments { get; set; }
        public DbSet<Application> Applications { get; set; }
    }
}