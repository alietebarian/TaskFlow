using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.ActivityLogs.GetTaskActivityLog;

public class GetTaskActivityLogQueryHandler : IRequestHandler<GetTaskActivityLogQuery, List<ActivityLogDto>>
{
    private readonly ApplicationDbContext _context;

    public GetTaskActivityLogQueryHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<ActivityLogDto>> Handle(GetTaskActivityLogQuery request, CancellationToken cancellationToken)
    {
        var isAuth = await _context.Tasks
            .AnyAsync(x => x.Id == request.TaskId && x.Project.Workspace.Members.Any(x => x.UserId == request.RequestingUserId), cancellationToken);

        if (!isAuth) throw new Exception("Task not found or access denied.");

        var logs = await _context.ActivityLogs
            .AsNoTracking()
            .Where(x => x.TaskId == request.TaskId)
            .OrderBy(x => x.CreatedAt)
            .Select(x => new ActivityLogDto(x.Id,x.Action.ToString() ,x.Details, x.User.FirstName, x.User.LastName, x.CreatedAt))
            .ToListAsync();

        return logs;
    }
}
