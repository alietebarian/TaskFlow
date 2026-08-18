using Application.Features.Tasks.Create;
using Application.Features.Tasks.GetProjectTasks;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/project/{projectId}/tasks")]
[ApiController]
[Authorize]
public class TaskController : BaseApiController
{
    private readonly IMediator _mediator;

    public TaskController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(Guid projectId, [FromBody] CreateTaskRequest request)
    {
        var command = new CreateTaskCommand(request.Title, request.Description, request.Priority, request.DueDate, projectId, CurrentUserId);
        var taskId = await _mediator.Send(command);

        return Ok(taskId);
    }

    [HttpGet]
    public async Task<IActionResult> GetTasks(Guid projectId)
    {
        var query = new GetProjectTasksQuery(projectId, CurrentUserId);
        var tasks = await _mediator.Send(query);

        return Ok(tasks);
    }
}
