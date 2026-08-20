
namespace Application.Features.Dashboard.GetWorkspaceStats;

public record WorkspaceStatsDto
(
    int TotalProjects,
    int TotalTasks,
    int TaskTodo,
    int TaskInProgress,
    int TasksDone,
    int OverDueTasks
);
