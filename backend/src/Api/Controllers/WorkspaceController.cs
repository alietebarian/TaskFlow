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
}
