using Application.Features.Projects.Create;
using Application.Features.Projects.GetWorkspaceProjects;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/workspace/{workspaceId}/projects")]
[ApiController]
[Authorize]
public class ProjectController : BaseApiController
{
    private readonly IMediator _mediator;

    public ProjectController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(Guid workspaceId, [FromBody] CreateProjectRequest request)
    {
        var command = new CreateProjectCommand(request.Name, request.Description, workspaceId, CurrentUserId);
        var projectId = await _mediator.Send(command);

        return Ok(projectId);
    }

    [HttpGet]
    public async Task<IActionResult> GetProjects(Guid workspaceId)
    {
        var query = new GetWorkspaceProjectsQuery(workspaceId ,CurrentUserId);
        var projects = await _mediator.Send(query);

        return Ok(projects);
    }
}
