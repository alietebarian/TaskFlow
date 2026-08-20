using Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Tasks.GetProjectTasks;

public class GetProjectTasksQueryHandler : IRequestHandler<GetProjectTasksQuery, PaginatedList<TaskDto>>
{
    private readonly ApplicationDbContext _context;

    public GetProjectTasksQueryHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PaginatedList<TaskDto>> Handle(GetProjectTasksQuery request, CancellationToken cancellationToken)
    {
        var isAuthorized = await _context.Projects
            .AnyAsync(x => x.Id == request.ProjectId && x.Workspace.Members.Any(xx => xx.UserId == request.RequestingUserId), cancellationToken);

        if (!isAuthorized) throw new Exception("Project not found or access denied.");

        var query = _context.Tasks
            .AsNoTracking()
            .Where(x => x.ProjectId == request.ProjectId);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            query = query.Where(t => t.Title.Contains(request.Search));
        }

        if (request.Status.HasValue)
        {
            query = query.Where(t => t.Status == request.Status.Value);
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(x => x.CreatedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(t => new TaskDto(t.Id, t.Title, t.Description, t.Status.ToString(), t.Priority.ToString(), t.DueDate, t.AssignedToId, t.CreatedAt))
            .ToListAsync(cancellationToken);

        return new PaginatedList<TaskDto>
        {
            Items = items,
            Page = request.Page,
            PageSize = request.PageSize,
            TotalCount = totalCount
        };
    }
}
