using MediatR;

namespace Application.Features.Workspaces.GetUserWorkspaces;

public record GetUserWorkspacesQuery
(
    Guid UserId
) : IRequest<List<WorkspaceDto>>;
