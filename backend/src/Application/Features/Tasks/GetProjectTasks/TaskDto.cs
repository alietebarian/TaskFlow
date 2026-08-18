namespace Application.Features.Tasks.GetProjectTasks;

public record TaskDto(
    Guid Id,
    string Title,
    string? Description,
    string Status,
    string Priority,
    DateTime? DueDate,
    Guid? AssignedToId,
    DateTime CreatedAt
),
