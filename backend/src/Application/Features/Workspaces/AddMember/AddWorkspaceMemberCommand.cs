using MediatR;

namespace Application.Features.Workspaces.AddMember;

public record AddWorkspaceMemberCommand(Guid WorkspaceId, string Email, Guid RequestingUserId) : IRequest;
