import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CheckSquare, Brain, Robot, ArrowsClockwise, Circle } from "@phosphor-icons/react";
import { api, type TaskItem } from "@/api/client";

type FilterType = "all" | "tasks" | "cortex" | "workers";

interface ActivityItem {
	id: string;
	type: "task_created" | "task_completed" | "cortex" | "worker_done";
	title: string;
	agent?: string;
	timeAgo: string;
}

const DUMMY_CORTEX_AND_WORKERS: ActivityItem[] = [
	{
		id: "c1",
		type: "cortex",
		title: "Memory bulletin generated — 12 memories consolidated",
		agent: "devbot",
		timeAgo: "1h ago",
	},
	{
		id: "w1",
		type: "worker_done",
		title: "Completed: analyze repository structure",
		agent: "devbot",
		timeAgo: "2h ago",
	},
	{
		id: "c2",
		type: "cortex",
		title: "Memory maintenance: 3 duplicates pruned",
		agent: "assistant",
		timeAgo: "5h ago",
	},
	{
		id: "w2",
		type: "worker_done",
		title: "Completed: draft PR description for feat/auth",
		agent: "devbot",
		timeAgo: "6h ago",
	},
	{
		id: "c3",
		type: "cortex",
		title: "Observation created: user prefers concise summaries",
		agent: "assistant",
		timeAgo: "8h ago",
	},
];

const TYPE_CONFIG: Record<
	ActivityItem["type"],
	{ icon: React.ElementType; iconClass: string; label: string }
> = {
	task_created: {
		icon: Circle,
		iconClass: "text-blue-400",
		label: "Task",
	},
	task_completed: {
		icon: CheckSquare,
		iconClass: "text-green-400",
		label: "Task",
	},
	cortex: {
		icon: Brain,
		iconClass: "text-violet-400",
		label: "Cortex",
	},
	worker_done: {
		icon: Robot,
		iconClass: "text-amber-400",
		label: "Worker",
	},
};

const FILTER_LABELS: { key: FilterType; label: string }[] = [
	{ key: "all", label: "All" },
	{ key: "tasks", label: "Tasks" },
	{ key: "cortex", label: "Cortex" },
	{ key: "workers", label: "Workers" },
];

export function RecentActivityCard() {
	const [filter, setFilter] = useState<FilterType>("all");

	const { data: tasksData } = useQuery({
		queryKey: ["tasks"],
		queryFn: () => api.listTasks({ limit: 20 }),
		staleTime: 30_000,
	});

	const taskItems: ActivityItem[] = (tasksData?.tasks ?? [] as TaskItem[])
		.slice(0, 10)
		.map((t) => ({
			id: `t-${t.id}`,
			type: t.status === "done" ? ("task_completed" as const) : ("task_created" as const),
			title: t.title,
			agent: t.owner_agent_id,
			timeAgo: formatTimeAgo(t.created_at),
		}));

	const allItems: ActivityItem[] = [
		...taskItems,
		...DUMMY_CORTEX_AND_WORKERS,
	];

	const filtered = allItems.filter((item) => {
		if (filter === "all") return true;
		if (filter === "tasks") return item.type === "task_created" || item.type === "task_completed";
		if (filter === "cortex") return item.type === "cortex";
		if (filter === "workers") return item.type === "worker_done";
		return true;
	});

	return (
		<div className="rounded-xl bg-app-dark-box p-5">
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h2 className="font-plex text-sm font-medium text-ink-dull">Recent Activity</h2>
					<ArrowsClockwise className="h-3.5 w-3.5 text-ink-faint" />
				</div>
				<div className="flex items-center gap-1">
					{FILTER_LABELS.map(({ key, label }) => (
						<button
							key={key}
							onClick={() => setFilter(key)}
							className={`rounded-md px-2.5 py-1 text-tiny transition-colors ${
								filter === key
									? "bg-accent/10 text-accent"
									: "text-ink-faint hover:text-ink-dull"
							}`}
						>
							{label}
						</button>
					))}
				</div>
			</div>

			{filtered.length === 0 ? (
				<div className="py-8 text-center">
					<p className="text-sm text-ink-faint">No activity yet</p>
				</div>
			) : (
				<div className="flex flex-col divide-y divide-app-line/40">
					{filtered.map((item) => {
						const config = TYPE_CONFIG[item.type];
						const Icon = config.icon;
						return (
							<div
								key={item.id}
								className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
							>
								<Icon className={`h-4 w-4 shrink-0 ${config.iconClass}`} />
								<div className="min-w-0 flex-1">
									<p className="truncate text-sm text-ink-dull">{item.title}</p>
									{item.agent && (
										<p className="text-tiny text-ink-faint">{item.agent}</p>
									)}
								</div>
								<span className="shrink-0 text-tiny tabular-nums text-ink-faint">
									{item.timeAgo}
								</span>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

function formatTimeAgo(dateStr: string): string {
	const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
	if (seconds < 60) return "just now";
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	return `${Math.floor(seconds / 86400)}d ago`;
}
