using MediatR;

namespace Application.Features.Tasks.GetProjectTasks;

public record GetProjectTasksQuery(Guid ProjectId, Guid RequestingUserId) : IRequest<List<TaskDto>>;
