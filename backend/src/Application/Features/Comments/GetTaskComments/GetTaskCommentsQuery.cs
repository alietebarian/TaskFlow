using MediatR;

namespace Application.Features.Comments.GetTaskComments;

public record GetTaskCommentsQuery(Guid TaskId, Guid RequestingUserId) : IRequest<List<CommentDto>>;
