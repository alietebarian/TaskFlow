using MediatR;

namespace Application.Features.Workspaces.Create;

public record CreateWorkspaceCommand
(
    string Name,
    Guid OwnerId
) : IRequest<Guid>;
