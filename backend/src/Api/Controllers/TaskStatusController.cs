using Application.Features.Tasks.UpdateStatus;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/tasks")]
[ApiController]
[Authorize]
public class TaskStatusController : BaseApiController
{
    private readonly IMediator _mediator;

    public TaskStatusController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPatch("{taskId}/status")]
    public async Task<IActionResult> UpdateStatus(Guid taskId, [FromBody] UpdateTaskStatusRequest request)
    {
        await _mediator.Send(new UpdateTaskStatusCommand(taskId, request.NewStatus, CurrentUserId));

        return Ok();
    }
}
