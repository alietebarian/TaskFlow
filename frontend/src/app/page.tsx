import Link from "next/link";
import { ArrowRight, Boxes, FolderKanban, ListChecks, LayoutGrid } from "lucide-react";
import { KanbanPreview } from "@/components/landing/kanban-preview";

const HIERARCHY = [
  {
    step: "01",
    icon: Boxes,
    title: "Workspace",
    description: "One home for your team. Everyone you invite sees the same work.",
  },
  {
    step: "02",
    icon: FolderKanban,
    title: "Project",
    description: "Split work into projects — a redesign, a launch, a sprint.",
  },
  {
    step: "03",
    icon: ListChecks,
    title: "Task",
    description: "The actual work. Assigned, prioritized, and given a due date.",
  },
  {
    step: "04",
    icon: LayoutGrid,
    title: "Board",
    description: "Drag tasks across To do, In progress, and Done as work moves.",
  },
];

const FEATURES = [
  {
    tag: "OWNERSHIP",
    title: "Every workspace has one owner, no ambiguity",
    description: "Invite teammates by email. Only the owner controls who gets in.",
  },
  {
    tag: "REALTIME",
    title: "Boards update the moment status changes",
    description: "Drag a card and it moves instantly — no page refresh, no waiting.",
  },
  {
    tag: "HISTORY",
    title: "Nothing gets lost in a comment thread",
    description: "Every status change and comment is logged on the task itself.",
  },
  {
    tag: "FOCUS",
    title: "Search and filter without losing your place",
    description: "Find a task by title, status, or priority in the same board view.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] text-[#14171F]">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
          TaskFlow
        </span>
        <nav className="flex items-center gap-6">
          <Link href="/login" className="text-sm text-neutral-600 hover:text-neutral-900">
            Sign in
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-[#14171F] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4F46E5]"
          >
            Create free workspace
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(79,70,229,0.15) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[#4F46E5]">
              Project management, structured
            </span>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Every task has a home.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-600">
              TaskFlow organizes your team&apos;s work into workspaces, projects, and
              tasks — then gives you a board to move it all forward.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-full bg-[#4F46E5] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]"
              >
                Create free workspace
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/login"
                className="text-sm font-medium text-neutral-700 hover:text-[#14171F]"
              >
                Sign in
              </Link>
            </div>
          </div>

          <KanbanPreview />
        </div>
      </section>

      {/* Hierarchy */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
            One structure, four levels
          </h2>
          <p className="mt-2 max-w-lg text-sm text-neutral-500">
            Nothing sits outside this chain — every task belongs to a project, every project to a workspace.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HIERARCHY.map(({ step, icon: Icon, title, description }, i) => (
              <div key={step} className="relative">
                <div className="flex items-center gap-3">
                  <span className="font-[family-name:var(--font-mono)] text-xs text-neutral-300">
                    {step}
                  </span>
                  <Icon className="h-4 w-4 text-[#4F46E5]" />
                </div>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-base font-semibold">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                  {description}
                </p>
                {i < HIERARCHY.length - 1 && (
                  <div className="mt-6 hidden h-px w-full bg-gradient-to-r from-black/10 to-transparent lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
          Built for how teams actually work
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.tag}
              className="rounded-xl border border-black/5 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[#4F46E5]">
                {feature.tag}
              </span>
              <h3 className="mt-3 text-base font-semibold leading-snug">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-black/5 bg-[#14171F]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-14 md:flex-row md:items-center">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
              Start organizing in under a minute.
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              No credit card. Just a workspace, and a board waiting to be filled.
            </p>
          </div>
          <Link
            href="/register"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#14171F] transition-colors hover:bg-neutral-100"
          >
            Create free workspace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 py-8">
        <p className="font-[family-name:var(--font-mono)] text-xs text-neutral-400">
          TaskFlow — built with Next.js &amp; ASP.NET Core
        </p>
      </footer>
    </div>
  );
}