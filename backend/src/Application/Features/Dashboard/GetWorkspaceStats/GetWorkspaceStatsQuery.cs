using MediatR;

namespace Application.Features.Dashboard.GetWorkspaceStats;

public record GetWorkspaceStatsQuery(Guid WorkspaceId, Guid RequestingUserId) : IRequest<WorkspaceStatsDto>;
