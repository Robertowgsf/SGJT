using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SGJT.Domain.Entities;

namespace SGJT.Infra.Data.Configurations
{
    public class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.Property(a => a.Name)
                .HasColumnType("varchar(100)")
                .IsRequired();
            builder.Property(a => a.Description)
                .HasColumnType("varchar(255)")
                .IsRequired();
            builder.Property(a => a.EstimatedHours)
                .HasColumnType("int")
                .IsRequired();
            builder.Property(a => a.WorkedHours)
                .HasColumnType("int")
                .IsRequired();
            builder.Property(a => a.Status)
                .HasColumnType("varchar(100)")
                .IsRequired();
            builder.Property(a => a.StartDate)
                .HasColumnType("datetime")
                .IsRequired();
            builder.Property(a => a.Deadline)
                .HasColumnType("datetime")
                .IsRequired();
        }
    }
}
