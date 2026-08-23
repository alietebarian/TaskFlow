using Application.Features.Dashboard.GetWorkspaceStats;
using Application.Features.Workspaces.AddMember;
using Application.Features.Workspaces.Create;
using Application.Features.Workspaces.GetUserWorkspaces;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class WorkspaceController : BaseApiController
{
    private readonly IMediator _mediator;

    public WorkspaceController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateWorkspaceRequest request)
    {
        var command = new CreateWorkspaceCommand(request.Name, CurrentUserId);
        var workspaceId = await _mediator.Send(command);

        return Ok(workspaceId);
    }

    [HttpGet]
    public async Task<IActionResult> GetWorkspaces()
    {
        var query = new GetUserWorkspacesQuery(CurrentUserId);
        var workspaces = await _mediator.Send(query);

        return Ok(workspaces);
    }

    [HttpPost("{workspaceId}/members")]
    public async Task<IActionResult> AddMember(Guid workspaceId, [FromBody] AddWorkspaceMemberRequest request)
    {
        await _mediator.Send(new AddWorkspaceMemberCommand(workspaceId, request.Email, CurrentUserId));
        return Ok();
    }

    [HttpGet("{workspaceId}/stats")]
    public async Task<IActionResult> GetStats(Guid workspaceId)
    {
        var query = new GetWorkspaceStatsQuery(workspaceId, CurrentUserId);
        var stats = await _mediator.Send(query);
        return Ok(stats);
    }

    [HttpGet("{workspaceId}/members")]
    public async Task<IActionResult> GetMembers(Guid workspaceId)
    {
        var query = new GetWorkspaceStatsQuery(workspaceId, CurrentUserId);
        var members = await _mediator.Send(query);

        return Ok(members);
    }
}
