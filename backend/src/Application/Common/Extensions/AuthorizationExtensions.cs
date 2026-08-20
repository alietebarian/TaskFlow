using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Common.Extensions;

public static class AuthorizationExtensions
{
    public static Task<bool> IsWorkspaceMemberAsync(
        this ApplicationDbContext context,
        Guid WorkspaceId,
        Guid UserId,
        CancellationToken cancellationToken
     )
    {
        return context.WorkspaceMembers
            .AnyAsync(x => x.WorkspaceId == WorkspaceId && x.UserId == UserId, cancellationToken);
    }
}
