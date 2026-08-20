using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations;

public class ActivityLogConfiguration : IEntityTypeConfiguration<ActivityLog>
{
    public void Configure(EntityTypeBuilder<ActivityLog> builder)
    {
        builder.HasOne(x => x.TaskItem)
           .WithMany(x => x.ActivityLogs)
           .HasForeignKey(x => x.TaskId)
           .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.User)
           .WithMany(x => x.ActivityLogs)
           .HasForeignKey(x => x.UserId)
           .OnDelete(DeleteBehavior.Restrict);
    }
}
