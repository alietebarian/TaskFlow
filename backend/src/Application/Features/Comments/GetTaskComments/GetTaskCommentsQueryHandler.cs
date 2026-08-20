using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Comments.GetTaskComments;

public class GetTaskCommentsQueryHandler : IRequestHandler<GetTaskCommentsQuery, List<CommentDto>>
{
    private readonly ApplicationDbContext _context;

    public GetTaskCommentsQueryHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<CommentDto>> Handle(GetTaskCommentsQuery request, CancellationToken cancellationToken)
    {
        var isAuth = await _context.Tasks
            .AnyAsync(x => x.Id == request.TaskId && x.Project.Workspace.Members.Any(x => x.UserId == request.RequestingUserId), cancellationToken);

        if (!isAuth) throw new Exception("Task not found or access denied.");

        var comments = await _context.Comments
            .AsNoTracking()
            .Where(x => x.TaskId == request.TaskId)
            .OrderBy(x => x.CreatedAt)
            .Select(x => new CommentDto(x.Id, x.Content, x.AuthorId, x.Author.FirstName, x.Author.LastName, x.CreatedAt))
            .ToListAsync(cancellationToken);

        return comments;
    }
}
