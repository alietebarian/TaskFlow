"use client";

import { useAuthGuard } from "@/features/auth/hooks/use-auth-guard";
import { CreateWorkspaceDialog } from "@/features/workspaces/components/create-workspace-dialog";
import { useWorkspaces } from "@/features/workspaces/hooks/use-workspace";
import Link from "next/link";

export default function DashboardPage() {
  useAuthGuard();

  const { data: workspaces, isLoading, isError } = useWorkspaces();

  if (isLoading) {
    return <div className="p-8">Loading workspaces...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-red-600">
        Something went wrong while loading your workspaces.
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">My Workspaces</h1>
        <CreateWorkspaceDialog />
      </div>

      {workspaces && workspaces.length === 0 ? (
        <p className="text-neutral-500">
          You don&apos;t have any workspaces yet. Create your first one to get started.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaces?.map((workspace) => (
            <Link
              key={workspace.id}
              href={`/dashboard/workspace/${workspace.id}`}
              className="rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="font-medium">{workspace.name}</h2>
              <p className="text-sm text-neutral-500">
                Created {new Date(workspace.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}