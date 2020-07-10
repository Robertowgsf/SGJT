using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SGJT.Domain.Entities;

namespace SGJT.Infra.Data.Configurations
{
    public class ProjectTeamConfiguration : IEntityTypeConfiguration<ProjectTeam>
    {
        public void Configure(EntityTypeBuilder<ProjectTeam> builder)
        {
            builder
                .HasOne(a => a.Project)
                .WithMany(b => b.ProjectTeams);
            builder
                .HasOne(a => a.Team)
                .WithMany(b => b.ProjectTeams);
        }
    }
}
