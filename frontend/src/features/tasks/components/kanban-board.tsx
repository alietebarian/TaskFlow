"use client";

import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useTasks } from "../hooks/use-tasks";
import { useUpdateTaskStatus } from "../hooks/use-update-task-status";
import { KanbanColumn } from "./kanban-column";
import { Task, TaskStatus } from "../types/task";

const STATUSES: TaskStatus[] = ["Todo", "InProgress", "Done"];

export function KanbanBoard({ projectId }: { projectId: string }) {
    const { data: tasks, isLoading, isError } = useTasks(projectId);
    const { mutate: updateStatus } = useUpdateTaskStatus(projectId);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    );

    if (isLoading) return <div>Loading tasks...</div>;
    if (isError) return <div className="text-red-600">Failed to load tasks.</div>;

    const tasksByStatus = (status: TaskStatus): Task[] =>
        tasks?.filter((task) => task.status === status) ?? [];

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;

        const taskId = active.id as string;
        const newStatus = over.id as TaskStatus;

        const task = tasks?.find((t) => t.id === taskId);
        if (!task || task.status === newStatus) return;

        updateStatus({ taskId, newStatus });
    }

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="flex gap-4 overflow-x-auto pb-4">
                {STATUSES.map((status) => (
                    <KanbanColumn key={status} status={status} tasks={tasksByStatus(status)} />
                ))}
            </div>
        </DndContext>
    );
}