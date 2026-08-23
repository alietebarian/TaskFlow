namespace Application.Features.Workspaces.GetWorkspaceMembers;

public record WorkspaceMemberDto(Guid UserId, string FirstName, string LastName, string Email, string Role, DateTime JoinedAt);
