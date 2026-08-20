namespace Application.Features.ActivityLogs.GetTaskActivityLog;

public record ActivityLogDto
    (Guid Id, string Action, string? Details, string UserFirstName, string UserLastName, DateTime CreatedAt);
