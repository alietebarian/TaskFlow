using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Workspaces.GetUserWorkspaces;

public class GetUserWorkspacesQueryHandler : IRequestHandler<GetUserWorkspacesQuery, List<WorkspaceDto>>
{
    private readonly ApplicationDbContext _context;

    public GetUserWorkspacesQueryHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<WorkspaceDto>> Handle(GetUserWorkspacesQuery request, CancellationToken cancellationToken)
    {
        var workspaces = await _context.Workspaces
            .AsNoTracking()
            .Where(x => x.OwnerId == request.UserId)
            .Select(w => new WorkspaceDto(w.Id, w.Name, w.CreatedAt))
            .ToListAsync(cancellationToken);

        return workspaces;
    }
}
