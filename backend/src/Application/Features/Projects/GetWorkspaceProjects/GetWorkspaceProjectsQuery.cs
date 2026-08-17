using MediatR;

namespace Application.Features.Projects.GetWorkspaceProjects;

public record GetWorkspaceProjectsQuery
(Guid WorkspaceId, Guid RequestingUserId) : IRequest<List<ProjectDto>>;
