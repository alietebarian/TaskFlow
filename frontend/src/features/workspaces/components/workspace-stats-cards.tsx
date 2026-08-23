"use client";

import { CheckCircle2, Circle, Clock, FolderKanban, AlertTriangle } from "lucide-react";
import { useWorkspaceStats } from "../hooks/use-workspace-stats";

export function WorkspaceStatsCards({ workspaceId }: { workspaceId: string }) {
    const { data: stats, isLoading } = useWorkspaceStats(workspaceId);

    if (isLoading || !stats) return null;

    const cards = [
        { label: "Projects", value: stats.totalProjects, icon: FolderKanban, color: "text-blue-600 bg-blue-50" },
        { label: "To Do", value: stats.taskTodo, icon: Circle, color: "text-neutral-600 bg-neutral-100" },
        { label: "In Progress", value: stats.taskInProgress, icon: Clock, color: "text-orange-600 bg-orange-50" },
        { label: "Done", value: stats.tasksDone, icon: CheckCircle2, color: "text-green-600 bg-green-50" },
        { label: "Overdue", value: stats.overDueTasks, icon: AlertTriangle, color: "text-red-600 bg-red-50" },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {cards.map((card) => (
                <div key={card.label} className="rounded-lg border bg-white p-4">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-md ${card.color} mb-2`}>
                        <card.icon className="w-4 h-4" />
                    </div>
                    <p className="text-2xl font-semibold">{card.value}</p>
                    <p className="text-xs text-neutral-500">{card.label}</p>
                </div>
            ))}
        </div>
    );
}