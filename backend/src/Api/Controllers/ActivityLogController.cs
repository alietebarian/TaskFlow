using Application.Features.ActivityLogs.GetTaskActivityLog;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/tasks/{taskId}/activity")]
[ApiController]
[Authorize]
public class ActivityLogController : BaseApiController
{
    private readonly IMediator _mediator;

    public ActivityLogController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetActivityLog(Guid taskId)
    {
        var query = new GetTaskActivityLogQuery(taskId, CurrentUserId);
        var logs = await _mediator.Send(query);

        return Ok(logs);
    }
}
