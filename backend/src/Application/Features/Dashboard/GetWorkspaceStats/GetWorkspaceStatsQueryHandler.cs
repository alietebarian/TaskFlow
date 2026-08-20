using Application.Common.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Dashboard.GetWorkspaceStats;

public class GetWorkspaceStatsQueryHandler : IRequestHandler<GetWorkspaceStatsQuery, WorkspaceStatsDto>
{
    private readonly ApplicationDbContext _context;

    public GetWorkspaceStatsQueryHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<WorkspaceStatsDto> Handle(GetWorkspaceStatsQuery request, CancellationToken cancellationToken)
    {
        var isMember = await _context.IsWorkspaceMemberAsync(request.WorkspaceId, request.RequestingUserId, cancellationToken);
        if (!isMember) throw new Exception("Workspace not found or access denied.");

        var totalProjects = await _context.Projects.CountAsync(p => p.WorkspaceId == request.WorkspaceId, cancellationToken);
        
        var taskQuery = _context.Tasks.Where(t => t.Project.WorkspaceId == request.WorkspaceId);

        var totalTasks = await taskQuery.CountAsync(cancellationToken);
        var taskTodo = await taskQuery.CountAsync(t => t.Status == Domain.Enums.TaskStatus.Todo, cancellationToken);
        var tasksInProgress = await taskQuery.CountAsync(t => t.Status == Domain.Enums.TaskStatus.InProgress, cancellationToken);
        var tasksDone = await taskQuery.CountAsync(t => t.Status == Domain.Enums.TaskStatus.Done, cancellationToken);
        var overdueTasks = await taskQuery.CountAsync(
            t => t.DueDate.HasValue && t.DueDate.Value < DateTime.UtcNow && t.Status != Domain.Enums.TaskStatus.Done,
            cancellationToken);

        return new WorkspaceStatsDto(totalProjects, totalTasks, taskTodo, tasksInProgress, tasksDone, overdueTasks);
    }
}
