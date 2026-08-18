using Domain.Enums;
using MediatR;

namespace Application.Features.Tasks.Create;

public record CreateTaskCommand(
    string Title,
    string? Description,
    TaskPriority Priority,
    DateTime? DueDate,
    Guid ProjectId,
    Guid RequestingUserId
) : IRequest<Guid>;
