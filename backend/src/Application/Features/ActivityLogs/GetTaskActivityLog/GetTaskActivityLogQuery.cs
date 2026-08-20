using MediatR;

namespace Application.Features.ActivityLogs.GetTaskActivityLog;

public record GetTaskActivityLogQuery(Guid TaskId, Guid RequestingUserId) : IRequest<List<ActivityLogDto>>;
