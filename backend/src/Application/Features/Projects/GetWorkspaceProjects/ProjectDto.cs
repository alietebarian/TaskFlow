namespace Application.Features.Projects.GetWorkspaceProjects;

public record ProjectDto
(Guid Id, string Name, string? Description, DateTime CreatedAt);