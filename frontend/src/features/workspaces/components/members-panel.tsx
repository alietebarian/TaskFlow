"use client";

import { useMembers } from "../hooks/use-members";
import { AddMemberDialog } from "./add-member-dialog";

export function MembersPanel({ workspaceId }: { workspaceId: string }) {
    const { data: members, isLoading } = useMembers(workspaceId);
    if (isLoading) return null;

    return (
        <div className="rounded-lg border bg-white p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold">Members ({members?.length ?? 0})</h2>
                <AddMemberDialog workspaceId={workspaceId} />
            </div>

            <div className="space-y-2">
                {members?.map((member) => (
                    <div key={member.userId} className="flex items-center justify-between text-sm py-1">
                        <div>
                            <span className="font-medium">
                                {member.firstName} {member.lastName}
                            </span>
                            <span className="text-neutral-500 ml-2">{member.email}</span>
                        </div>
                        <span
                            className={`text-xs px-2 py-0.5 rounded-full ${member.role === "Owner"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-neutral-100 text-neutral-600"
                                }`}
                        >
                            {member.role}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}