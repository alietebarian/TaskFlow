namespace Application.Features.Workspaces.GetUserWorkspaces;

public record WorkspaceDto
(
    Guid Id, string Name, DateTime CreatedAt
);
