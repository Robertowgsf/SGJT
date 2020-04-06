using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SGJT.Domain.Entities;

namespace SGJT.Infra.Data.Configurations
{
    public class UserTeamConfiguration : IEntityTypeConfiguration<UserTeam>
    {
        public void Configure(EntityTypeBuilder<UserTeam> builder)
        {
            builder
                .HasKey(a => new { a.UserId, a.TeamId });
            builder
                .HasOne(a => a.User)
                .WithMany(b => b.UserTeams)
                .HasForeignKey(a => a.UserId);
            builder
                .HasOne(a => a.Team)
                .WithMany(b => b.UserTeams)
                .HasForeignKey(a => a.TeamId);
        }
    }
}
