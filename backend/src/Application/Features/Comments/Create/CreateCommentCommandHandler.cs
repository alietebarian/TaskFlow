using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Comments.Create;

public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, Guid>
{
    private readonly ApplicationDbContext _context;

    public CreateCommentCommandHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
    {
        var task = await _context.Tasks
            .FirstOrDefaultAsync(x => x.Id == request.TaskId && x.Project.Workspace.Members.Any(x => x.UserId == request.RequestingUserId), cancellationToken);

        if (task == null) throw new Exception("Task not found or access denied.");

        var comment = new Comment
        {
            Content = request.Content,
            TaskId = request.TaskId,
            AuthorId = request.RequestingUserId
        };

        _context.Comments.Add(comment);

        var activityLog = new ActivityLog
        {
            TaskId = request.TaskId,
            UserId = request.RequestingUserId,
            Details = "Comment added",
            Action = Domain.Enums.ActivityAction.CommentAdded
        };

        _context.ActivityLogs.Add(activityLog);

        await _context.SaveChangesAsync(cancellationToken);

        return comment.Id;
    }
}
