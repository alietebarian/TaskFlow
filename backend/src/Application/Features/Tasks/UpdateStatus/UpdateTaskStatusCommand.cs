using MediatR;
using Domain.Enums;

namespace Application.Features.Tasks.UpdateStatus;

public record UpdateTaskStatusCommand(Guid TaskId, Domain.Enums.TaskStatus NewStatus, Guid RequestingUserId) : IRequest;
