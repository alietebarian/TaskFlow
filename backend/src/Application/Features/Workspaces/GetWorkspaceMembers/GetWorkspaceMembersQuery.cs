using MediatR;

namespace Application.Features.Workspaces.GetWorkspaceMembers;

public record GetWorkspaceMembersQuery(Guid WorkspaceId, Guid RequestingUserId) : IRequest<List<WorkspaceMemberDto>>;
