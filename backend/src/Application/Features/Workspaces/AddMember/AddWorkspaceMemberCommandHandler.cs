using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Workspaces.AddMember;

public class AddWorkspaceMemberCommandHandler : IRequestHandler<AddWorkspaceMemberCommand>
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<User> _userManager;

    public AddWorkspaceMemberCommandHandler(ApplicationDbContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public async Task Handle(AddWorkspaceMemberCommand request, CancellationToken cancellationToken)
    {
        var isOwner = await _context.WorkspaceMembers
            .AnyAsync(
                x => x.WorkspaceId == request.WorkspaceId
                && x.UserId == request.RequestingUserId
                && x.Role == Domain.Enums.WorkspaceRole.Owner,
                cancellationToken
             );

        if (!isOwner) throw new Exception("Workspace not found or access denied.");

        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user == null) throw new Exception("User with this email was not found.");

        var alreadyMember = await _context.WorkspaceMembers
            .AnyAsync(
                x => x.WorkspaceId == request.WorkspaceId && x.UserId == user.Id
            );

        if (alreadyMember) throw new Exception("This user is already a member of the workspace.");

        var newMember = new WorkspaceMember
        {
            WorkspaceId = request.WorkspaceId,
            UserId = user.Id,
            Role = Domain.Enums.WorkspaceRole.Member
        };

        _context.WorkspaceMembers.Add( newMember );
        await _context.SaveChangesAsync(cancellationToken);
    }
}
