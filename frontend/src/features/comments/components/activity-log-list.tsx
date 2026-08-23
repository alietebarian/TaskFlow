"use client";

import { useActivityLog } from "../hooks/use-activity-log";

const ACTION_LABELS: Record<string, string> = {
    TaskCreated: "created this task",
    StatusChanged: "changed the status",
    CommentAdded: "added a comment",
};

export function ActivityLogList({ taskId }: { taskId: string }) {
    const { data: logs, isLoading } = useActivityLog(taskId);

    if (isLoading) {
        return <p className="text-sm text-neutral-400">Loading activity...</p>;
    }

    if (!logs || logs.length === 0) {
        return <p className="text-sm text-neutral-400">No activity yet.</p>;
    }

    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold">Activity</h3>
            <div className="space-y-2">
                {logs.map((log) => (
                    <div key={log.id} className="text-sm text-neutral-600 border-l-2 border-neutral-200 pl-3">
                        <span className="font-medium">
                            {log.userFirstName} {log.userLastName}
                        </span>{" "}
                        {ACTION_LABELS[log.action] ?? log.action}
                        {log.details && <span className="text-neutral-400"> — {log.details}</span>}
                        <div className="text-xs text-neutral-400">
                            {new Date(log.createdAt).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}