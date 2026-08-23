"use client";

import { useState } from "react";
import { useComments } from "../hooks/use-comments";
import { useCreateComment } from "../hooks/use-create-comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function CommentList({ taskId }: { taskId: string }) {
    const { data: comments, isLoading } = useComments(taskId);
    const { mutate, isPending } = useCreateComment(taskId);
    const [content, setContent] = useState("");

    function handleSubmit() {
        if (!content.trim()) return;
        mutate(content, {
            onSuccess: () => setContent(""),
        });
    }

    return (
        <div className="space-y-4">
            <h3 className="text-sm font-semibold">Comments</h3>

            <div className="space-y-3">
                {isLoading && <p className="text-sm text-neutral-400">Loading comments...</p>}

                {!isLoading && comments?.length === 0 && (
                    <p className="text-sm text-neutral-400">No comments yet.</p>
                )}

                {comments?.map((comment) => (
                    <div key={comment.id} className="rounded-md bg-neutral-50 p-3">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">
                                {comment.authorFirstName} {comment.authorLastName}
                            </span>
                            <span className="text-xs text-neutral-400">
                                {new Date(comment.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <p className="text-sm text-neutral-700">{comment.content}</p>
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                <Textarea
                    placeholder="Write a comment..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={3}
                />
                <Button size="sm" onClick={handleSubmit} disabled={isPending || !content.trim()}>
                    {isPending ? "Posting..." : "Post comment"}
                </Button>
            </div>
        </div>
    );
}