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

        task.Status = request.NewStatus;
        await _context.SaveChangesAsync(cancellationToken);
    }
}
