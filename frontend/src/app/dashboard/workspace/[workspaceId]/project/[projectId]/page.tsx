"use client";

import { useParams } from "next/navigation";
import { useAuthGuard } from "@/features/auth/hooks/use-auth-guard";
import { CreateTaskDialog } from "@/features/tasks/components/create-task-dialog";
import { KanbanBoard } from "@/features/tasks/components/kanban-board";

export default function ProjectPage() {
  useAuthGuard();

  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <CreateTaskDialog projectId={projectId} />
      </div>

      <KanbanBoard projectId={projectId} />
    </div>
  );
}