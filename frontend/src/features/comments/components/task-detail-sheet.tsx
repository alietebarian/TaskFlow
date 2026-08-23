"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { CommentList } from "@/features/comments/components/comment-list";
import { Task } from "@/features/tasks/types/task";
import { ActivityLogList } from "./activity-log-list";

const PRIORITY_COLORS: Record<string, string> = {
    Low: "bg-neutral-100 text-neutral-600",
    Medium: "bg-blue-100 text-blue-700",
    High: "bg-orange-100 text-orange-700",
    Urgent: "bg-red-100 text-red-700",
};

interface TaskDetailSheetProps {
    task: Task | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TaskDetailSheet({ task, open, onOpenChange }: TaskDetailSheetProps) {
    if (!task) return null;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="overflow-y-auto sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>{task.title}</SheetTitle>
                </SheetHeader>

                <div className="px-4 space-y-6">
                    <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${PRIORITY_COLORS[task.priority]}`}>
                            {task.priority}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-600">
                            {task.status}
                        </span>
                    </div>

                    {task.description && (
                        <div>
                            <h3 className="text-sm font-semibold mb-1">Description</h3>
                            <p className="text-sm text-neutral-600">{task.description}</p>
                        </div>
                    )}

                    <ActivityLogList taskId={task.id} />

                    <CommentList taskId={task.id} />
                </div>
            </SheetContent>
        </Sheet>
    );
}