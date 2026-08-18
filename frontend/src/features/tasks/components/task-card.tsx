"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../types/task";

const PRIORITY_COLORS: Record<string, string> = {
    Low: "bg-neutral-100 text-neutral-600",
    Medium: "bg-blue-100 text-blue-700",
    High: "bg-orange-100 text-orange-700",
    Urgent: "bg-red-100 text-red-700",
};

export function TaskCard({ task }: { task: Task }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="rounded-lg border bg-white p-3 shadow-sm cursor-grab active:cursor-grabbing"
        >
            <h3 className="text-sm font-medium">{task.title}</h3>
            {task.description && (
                <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{task.description}</p>
            )}
            <span
                className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${PRIORITY_COLORS[task.priority]}`}
            >
                {task.priority}
            </span>
        </div>
    );
}