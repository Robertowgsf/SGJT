using Microsoft.EntityFrameworkCore;
using SGJT.Domain.Entities;
using System.Reflection;

namespace SGJT.Infra.Data.Contexts
{
    public class SGJTContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<UserTeam> UserTeams { get; set; }

        public SGJTContext(DbContextOptions<SGJTContext> options) : base(options) 
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
