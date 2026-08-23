using Application.Common.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Workspaces.GetWorkspaceMembers;

public class GetWorkspaceMembersQueryHandler : IRequestHandler<GetWorkspaceMembersQuery, List<WorkspaceMemberDto>>
{
    private readonly ApplicationDbContext _context;

    public GetWorkspaceMembersQueryHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<WorkspaceMemberDto>> Handle(GetWorkspaceMembersQuery request, CancellationToken cancellationToken)
    {
        var isMember = await _context.IsWorkspaceMemberAsync(request.WorkspaceId, request.RequestingUserId, cancellationToken);
        if (!isMember) throw new Exception("Workspace not found or access denied.");

        var members = await _context.WorkspaceMembers
            .AsNoTracking()
            .Where(x => x.WorkspaceId == request.WorkspaceId)
            .Select(xx => new WorkspaceMemberDto(xx.UserId, xx.User.FirstName, xx.User.LastName, xx.User.Email!, xx.Role.ToString(), xx.JoinedAt))
            .ToListAsync(cancellationToken);

        return members;
    }
}
