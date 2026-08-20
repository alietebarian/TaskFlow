namespace Application.Features.Comments.GetTaskComments;

public record CommentDto
    (Guid Id, string Content, Guid AuthorId, string AuthorFirstName, string AuthorLastName, DateTime CreatedAt);
