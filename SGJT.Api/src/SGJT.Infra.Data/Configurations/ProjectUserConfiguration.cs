using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SGJT.Domain.Entities;

namespace SGJT.Infra.Data.Configurations
{
    public class ProjectUserConfiguration : IEntityTypeConfiguration<ProjectUser>
    {
        public void Configure(EntityTypeBuilder<ProjectUser> builder)
        {
            builder
                .HasOne(a => a.Project)
                .WithMany(b => b.ProjectUsers);
            builder
                .HasOne(a => a.User)
                .WithMany(b => b.ProjectUsers);
        }
    }
}
