using Application.Common.Models;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Application.Features.Tasks.GetProjectTasks;

//public record GetProjectTasksQuery(Guid ProjectId, Guid RequestingUserId) : IRequest<List<TaskDto>>;

public class GetProjectTasksQuery : PaginationParams, IRequest<PaginatedList<TaskDto>>
{
    [BindNever]
    public Guid ProjectId { get; set; }
    [BindNever]
    public Guid RequestingUserId { get; set; }
    public string? Search { get; set; }
    public Domain.Enums.TaskStatus? Status { get; set; }
    public TaskPriority? Priority { get; set; }
}
