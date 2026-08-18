"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task, TaskStatus } from "../types/task";
import { TaskCard } from "./task-card";

const COLUMN_TITLES: Record<TaskStatus, string> = {
    Todo: "To Do",
    InProgress: "In Progress",
    Done: "Done",
};

export function KanbanColumn({ status, tasks }: { status: TaskStatus; tasks: Task[] }) {
    const { setNodeRef, isOver } = useDroppable({ id: status });

    return (
        <div
            ref={setNodeRef}
            className={`flex-1 min-w-70 rounded-lg p-3 transition-colors ${isOver ? "bg-neutral-100" : "bg-neutral-50"
                }`}
        >
            <h2 className="text-sm font-semibold mb-3 flex items-center justify-between">
                {COLUMN_TITLES[status]}
                <span className="text-xs text-neutral-400 font-normal">{tasks.length}</span>
            </h2>

            <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2 min-h-15">
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
}