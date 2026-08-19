using Domain.Entities;
using MediatR;
using Persistence;

namespace Application.Features.Workspaces.Create;

public class CreateWorkspaceCommandHandler : IRequestHandler<CreateWorkspaceCommand, Guid>
{
    private readonly ApplicationDbContext _context;

    public CreateWorkspaceCommandHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateWorkspaceCommand request, CancellationToken cancellationToken)
    {
        var workspace = new Workspace
        {
            Name = request.Name,
            OwnerId = request.OwnerId,
        };

        var workspaceMember = new WorkspaceMember
        {
            WorkspaceId = workspace.Id,
            UserId = request.OwnerId,
            Role = Domain.Enums.WorkspaceRole.Owner,
        };

        _context.Workspaces.Add(workspace);
        _context.WorkspaceMembers.Add(workspaceMember);
        await _context.SaveChangesAsync(cancellationToken);

        return workspace.Id;
    }
}
