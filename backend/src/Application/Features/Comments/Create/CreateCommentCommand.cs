using MediatR;

namespace Application.Features.Comments.Create;

public record CreateCommentCommand(string Content, Guid TaskId, Guid RequestingUserId) : IRequest<Guid>;
