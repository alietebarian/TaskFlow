"use client";

import { useParams } from "next/navigation";
import { useProjects } from "@/features/projects/hooks/use-projects";
import { CreateProjectDialog } from "@/features/projects/components/create-project-dialog";
import { useAuthGuard } from "@/features/auth/hooks/use-auth-guard";
import Link from "next/link";
import { WorkspaceStatsCards } from "@/features/workspaces/components/workspace-stats-cards";
import { MembersPanel } from "@/features/workspaces/components/members-panel";

export default function WorkspacePage() {
    useAuthGuard();

    const params = useParams<{ workspaceId: string }>();
    const workspaceId = params.workspaceId;

    const { data: projects, isLoading, isError } = useProjects(workspaceId);

    if (isLoading) {
        return <div className="p-8">Loading projects...</div>;
    }

    if (isError) {
        return (
            <div className="p-8 text-red-600">
                Something went wrong while loading projects.
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Projects</h1>
                <CreateProjectDialog workspaceId={workspaceId} />
            </div>
            <WorkspaceStatsCards workspaceId={workspaceId} />
            <MembersPanel workspaceId={workspaceId}/>
            {projects && projects.length === 0 ? (
                <p className="text-neutral-500">
                    No projects yet. Create your first one to get started.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects?.map((project) => (
                        <Link
                            key={project.id}
                            href={`/dashboard/workspace/${workspaceId}/project/${project.id}`}
                            className="rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h2 className="font-medium">{project.name}</h2>
                            {project.description && (
                                <p className="text-sm text-neutral-500 mt-1">{project.description}</p>
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}