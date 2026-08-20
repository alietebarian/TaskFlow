using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Tasks.GetProjectTasks;

public class GetProjectTasksQueryHandler : IRequestHandler<GetProjectTasksQuery, List<TaskDto>>
{
    private readonly ApplicationDbContext _context;

    public GetProjectTasksQueryHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<TaskDto>> Handle(GetProjectTasksQuery request, CancellationToken cancellationToken)
    {
        //var isAuthorized = await _context.Projects
        //    .AnyAsync(p => p.Id == request.ProjectId && p.Workspace.OwnerId == request.RequestingUserId, cancellationToken);

        var isAuthorized = await _context.Projects
            .AnyAsync(x => x.Id == request.ProjectId && x.Workspace.Members.Any(xx => xx.UserId == request.RequestingUserId), cancellationToken);

        if (!isAuthorized) throw new Exception("Project not found or access denied.");

        var tasks = await _context.Tasks
            .AsNoTracking()
            .Where(x => x.ProjectId == request.ProjectId)
            .Select(x => new TaskDto(x.Id, x.Title, x.Description, x.Status.ToString(), x.Priority.ToString(), x.DueDate, x.AssignedToId, x.CreatedAt))
            .ToListAsync(cancellationToken);

        return tasks;
    }
}
