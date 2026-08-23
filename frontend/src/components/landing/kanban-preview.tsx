"use client";

import { useEffect, useState } from "react";

type Status = "todo" | "inProgress" | "done";

interface PreviewCard {
    id: string;
    title: string;
    priority: "Low" | "Medium" | "High" | "Urgent";
    status: Status;
}

const PRIORITY_STYLES: Record<PreviewCard["priority"], string> = {
    Low: "bg-neutral-100 text-neutral-500",
    Medium: "bg-indigo-100 text-indigo-700",
    High: "bg-amber-100 text-amber-700",
    Urgent: "bg-rose-100 text-rose-700",
};

const COLUMNS: { id: Status; label: string }[] = [
    { id: "todo", label: "To do" },
    { id: "inProgress", label: "In progress" },
    { id: "done", label: "Done" },
];

const INITIAL_CARDS: PreviewCard[] = [
    { id: "1", title: "Design onboarding flow", priority: "High", status: "todo" },
    { id: "2", title: "Wire up auth", priority: "Medium", status: "inProgress" },
    { id: "3", title: "Fix invoice export", priority: "Urgent", status: "todo" },
    { id: "4", title: "Write API docs", priority: "Low", status: "done" },
];

const NEXT_STATUS: Record<Status, Status> = {
    todo: "inProgress",
    inProgress: "done",
    done: "todo",
};

export function KanbanPreview() {
    const [cards, setCards] = useState(INITIAL_CARDS);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const interval = setInterval(() => {
            setCards((prev) => {
                const movable = prev.filter((c) => c.status !== "done" || c.id === "4");
                const target = movable[Math.floor(Math.random() * movable.length)];
                return prev.map((c) =>
                    c.id === target.id ? { ...c, status: NEXT_STATUS[c.status] } : c
                );
            });
        }, 2600);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-3 gap-3 rounded-2xl border border-black/5 bg-white/70 p-4 shadow-[0_1px_0_rgba(0,0,0,0.02),0_20px_60px_-24px_rgba(20,23,31,0.25)] backdrop-blur-sm">
            {COLUMNS.map((col) => (
                <div key={col.id} className="min-w-0">
                    <div className="mb-2 flex items-center justify-between px-1">
                        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-neutral-400">
                            {col.label}
                        </span>
                        <span className="font-[family-name:var(--font-mono)] text-[10px] text-neutral-300">
                            {cards.filter((c) => c.status === col.id).length}
                        </span>
                    </div>
                    <div className="space-y-2">
                        {cards
                            .filter((c) => c.status === col.id)
                            .map((card) => (
                                <div
                                    key={card.id}
                                    className="rounded-lg border border-black/5 bg-white p-2.5 shadow-sm transition-all duration-700 ease-out"
                                >
                                    <p className="text-xs font-medium leading-snug text-neutral-800">
                                        {card.title}
                                    </p>
                                    <span
                                        className={`mt-1.5 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-medium ${PRIORITY_STYLES[card.priority]}`}
                                    >
                                        {card.priority}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}