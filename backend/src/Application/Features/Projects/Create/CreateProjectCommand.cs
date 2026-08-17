using MediatR;

namespace Application.Features.Projects.Create;

public record CreateProjectCommand
(
    string Name,
    string? Description,
    Guid WorkspaceId,
    Guid RequestingUserId
) : IRequest<Guid>;
