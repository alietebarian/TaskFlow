using Application.Features.Comments.Create;
using Application.Features.Comments.GetTaskComments;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/tasks/{taskId}/comments")]
[ApiController]
[Authorize]
public class CommentController : BaseApiController
{
    private readonly IMediator _mediator;

    public CommentController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(Guid taskId, [FromBody] CreateCommentRequest request)
    {
        var command = new CreateCommentCommand(request.Content, taskId, CurrentUserId);
        var comment = await _mediator.Send(command);

        return Ok(comment);
    }

    [HttpGet]
    public async Task<IActionResult> GetComments(Guid taskId)
    {
        var query = new GetTaskCommentsQuery(taskId, CurrentUserId);
        var comments = await _mediator.Send(query);

        return Ok(comments);
    }
}
