using Domain.Enums;

namespace Domain.Entities;

public class ActivityLog
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid TaskId { get; set; }
    public TaskItem TaskItem { get; set; } = null!;
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public ActivityAction Action { get; set; }
    public string? Details { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
