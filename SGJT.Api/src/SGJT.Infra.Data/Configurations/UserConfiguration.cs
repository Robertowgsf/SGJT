using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SGJT.Domain.Entities;

namespace SGJT.Infra.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(a => a.Name)
                .HasColumnType("varchar(100)")
                .IsRequired();
            builder.Property(a => a.Email)
                .HasColumnType("varchar(100)")
                .IsRequired();
            builder.Property(a => a.Password)
                .HasColumnType("varchar(100)")
                .IsRequired();
            builder.Property(a => a.Role)
                .HasColumnType("varchar(100)")
                .IsRequired();
        }
    }
}
