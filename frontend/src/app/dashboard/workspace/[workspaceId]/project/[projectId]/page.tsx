"use client";

import { useParams } from "next/navigation";
import { useTasks } from "@/features/tasks/hooks/use-tasks";
import { CreateTaskDialog } from "@/features/tasks/components/create-task-dialog";
import { useAuthGuard } from "@/features/auth/hooks/use-auth-guard";

const PRIORITY_COLORS: Record<string, string> = {
  Low: "bg-neutral-100 text-neutral-600",
  Medium: "bg-blue-100 text-blue-700",
  High: "bg-orange-100 text-orange-700",
  Urgent: "bg-red-100 text-red-700",
};

export default function ProjectPage() {
  useAuthGuard();

  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;

  const { data: tasks, isLoading, isError } = useTasks(projectId);

  if (isLoading) {
    return <div className="p-8">Loading tasks...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Something went wrong while loading tasks.
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <CreateTaskDialog projectId={projectId} />
      </div>

      {tasks && tasks.length === 0 ? (
        <p className="text-neutral-500">
          No tasks yet. Create your first one to get started.
        </p>
      ) : (
        <div className="space-y-3">
          {tasks?.map((task) => (
            <div
              key={task.id}
              className="rounded-lg border bg-white p-4 shadow-sm flex items-center justify-between"
            >
              <div>
                <h2 className="font-medium">{task.title}</h2>
                {task.description && (
                  <p className="text-sm text-neutral-500 mt-1">{task.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${PRIORITY_COLORS[task.priority]}`}
                >
                  {task.priority}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-600">
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}