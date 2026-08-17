using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Projects.GetWorkspaceProjects;

public class GetWorkspaceProjectsQueryHandler : IRequestHandler<GetWorkspaceProjectsQuery, List<ProjectDto>>
{
    private readonly ApplicationDbContext _context;

    public GetWorkspaceProjectsQueryHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<ProjectDto>> Handle(GetWorkspaceProjectsQuery request, CancellationToken cancellationToken)
    {
        var workspaceExists = await _context.Workspaces
            .AnyAsync(x => x.Id == request.WorkspaceId && x.OwnerId == request.RequestingUserId, cancellationToken);

        if (!workspaceExists) throw new Exception("Workspace not found or access denied.");

        var projects = await _context.Projects
            .AsNoTracking()
            .Where(x => x.WorkspaceId == request.WorkspaceId)
            .Select(xx => new ProjectDto(xx.Id, xx.Name, xx.Description, xx.CreatedAt))
            .ToListAsync(cancellationToken);

        return projects;
    }
}
