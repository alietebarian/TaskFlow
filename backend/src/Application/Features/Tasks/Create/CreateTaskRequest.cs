using Domain.Enums;

namespace Application.Features.Tasks.Create;

public record CreateTaskRequest
(
    string Title,
    string? Description,
    TaskPriority Priority,
    DateTime? DueDate
);
