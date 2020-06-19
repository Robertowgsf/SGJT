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
                .HasOne(a => a.User)
                .WithMany(b => b.UserTeams);
            builder
                .HasOne(a => a.Team)
                .WithMany(b => b.UserTeams);
        }
    }
}
