using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SGJT.Domain.Entities;

namespace SGJT.Infra.Data.Configurations
{
    public class WorkingTimeRecordConfiguration : IEntityTypeConfiguration<WorkingTimeRecord>
    {
        public void Configure(EntityTypeBuilder<WorkingTimeRecord> builder)
        {
            builder.Property(a => a.Description)
                .HasColumnType("varchar(255)");
            builder.Property(a => a.Type)
                .HasColumnType("varchar(100)")
                .IsRequired();
            //builder.Property(a => a.RecordDate)
                //.HasColumnType("datetime(")
        }
    }
}
