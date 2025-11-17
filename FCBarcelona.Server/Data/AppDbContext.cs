using Microsoft.EntityFrameworkCore;
using FCBarcelona.Server.Models;

namespace FCBarcelona.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Player> Players { get; set; }
        }
}
