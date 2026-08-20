using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Tasks.Create;

public class CreateTaskCommandHandler : IRequestHandler<CreateTaskCommand, Guid>
{
    private readonly ApplicationDbContext _context;

    public CreateTaskCommandHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateTaskCommand request, CancellationToken cancellationToken)
    {
        //var isAuthorized = await _context.Projects
        //     .AnyAsync(p => p.Id == request.ProjectId && p.Workspace.OwnerId == request.RequestingUserId, cancellationToken);

        var isAuthorized = await _context.Projects
            .AnyAsync(x => x.Id == request.ProjectId && x.Workspace.Members.Any(xx => xx.UserId == request.RequestingUserId), cancellationToken);

        if (!isAuthorized) throw new Exception("Project not found or access denied.");

        var newTask = new TaskItem
        {
            Title = request.Title,
            Description = request.Description,
            Priority = request.Priority,
            DueDate = request.DueDate,
            ProjectId = request.ProjectId,
            CreatedById = request.RequestingUserId,
            Status = Domain.Enums.TaskStatus.Todo
        };

        _context.Tasks.Add(newTask);

        var activityLog = new ActivityLog
        {
            TaskId = newTask.Id,
            UserId = request.RequestingUserId,
            Action = Domain.Enums.ActivityAction.TaskCreated,
            Details = $"Task \"{newTask.Title}\" was created"
        };

        _context.ActivityLogs.Add(activityLog);
        await _context.SaveChangesAsync(cancellationToken);

        return newTask.Id;
    }
}
