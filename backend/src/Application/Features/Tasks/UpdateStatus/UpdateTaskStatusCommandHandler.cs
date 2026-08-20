using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Tasks.UpdateStatus;

public class UpdateTaskStatusCommandHandler : IRequestHandler<UpdateTaskStatusCommand>
{
    private readonly ApplicationDbContext _context;

    public UpdateTaskStatusCommandHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(UpdateTaskStatusCommand request, CancellationToken cancellationToken)
    {
        //var task = await _context.Tasks
        //    .FirstOrDefaultAsync(x => x.Id == request.TaskId && x.Project.Workspace.OwnerId == request.RequestingUserId, cancellationToken);    

        var task = await _context.Tasks
            .FirstOrDefaultAsync(x => x.Id == request.TaskId && x.Project.Workspace.Members.Any(xx => xx.UserId == request.RequestingUserId), cancellationToken);

        if (task == null) throw new Exception("Task not found or access denied.");

        var oldStatus = task.Status;
        task.Status = request.NewStatus;
        var activityLog = new ActivityLog
        {
            TaskId = request.TaskId,
            UserId = request.RequestingUserId,
            Action = Domain.Enums.ActivityAction.StatusChanged,
            Details = $"Status changed from {oldStatus} to {request.NewStatus}",
        };

        _context.ActivityLogs.Add(activityLog);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
