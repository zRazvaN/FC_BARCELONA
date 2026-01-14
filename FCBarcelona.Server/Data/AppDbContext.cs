using FCBarcelona.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace FCBarcelona.Server.Data
{
    // Clasa principala care face legatura intre obiectele din cod si tabelele din baza de date
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Player> Players { get; set; }
        public DbSet<Vote> Votes { get; set; }
        public DbSet<Legend> Legends { get; set; }
    }
}