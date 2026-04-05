import { CheckCircle, WarningCircle, XCircle, ArrowRight, Clock } from "@phosphor-icons/react";

type ActionItemType = "task_approval" | "worker_failed" | "task_blocked";

interface ActionItem {
	id: string;
	type: ActionItemType;
	title: string;
	agent: string;
	timeAgo: string;
}

const DUMMY_ITEMS: ActionItem[] = [
	{
		id: "1",
		type: "task_approval",
		title: "Deploy backend changes to production",
		agent: "devbot",
		timeAgo: "2m ago",
	},
	{
		id: "2",
		type: "task_approval",
		title: "Send weekly digest to subscribers",
		agent: "assistant",
		timeAgo: "14m ago",
	},
	{
		id: "3",
		type: "worker_failed",
		title: "GitHub PR sync timed out",
		agent: "devbot",
		timeAgo: "1h ago",
	},
	{
		id: "4",
		type: "task_blocked",
		title: "Waiting for approval: database migration",
		agent: "devbot",
		timeAgo: "3h ago",
	},
	{
		id: "5",
		type: "task_approval",
		title: "Archive old project files in /workspace",
		agent: "assistant",
		timeAgo: "5h ago",
	},
];

const TYPE_CONFIG: Record<
	ActionItemType,
	{
		icon: React.ElementType;
		label: string;
		iconClass: string;
		badgeClass: string;
		action: string;
	}
> = {
	task_approval: {
		icon: CheckCircle,
		label: "Approval",
		iconClass: "text-amber-400",
		badgeClass: "bg-amber-500/10 text-amber-400",
		action: "Approve",
	},
	worker_failed: {
		icon: XCircle,
		label: "Failed",
		iconClass: "text-red-400",
		badgeClass: "bg-red-500/10 text-red-400",
		action: "View",
	},
	task_blocked: {
		icon: WarningCircle,
		label: "Blocked",
		iconClass: "text-orange-400",
		badgeClass: "bg-orange-500/10 text-orange-400",
		action: "Review",
	},
};

export function ActionItemsCard() {
	return (
		<div className="flex h-full flex-col rounded-xl bg-app-dark-box p-5">
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<h2 className="font-plex text-sm font-medium text-ink-dull">Inbox</h2>
					{DUMMY_ITEMS.length > 0 && (
						<span className="flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-white tabular-nums">
							{DUMMY_ITEMS.length}
						</span>
					)}
				</div>
				<Clock className="h-4 w-4 text-ink-faint" />
			</div>

			{DUMMY_ITEMS.length === 0 ? (
				<div className="flex flex-1 items-center justify-center">
					<div className="text-center">
						<CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-500/40" />
						<p className="text-sm text-ink-faint">All caught up</p>
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-2 overflow-y-auto">
					{DUMMY_ITEMS.map((item) => {
						const config = TYPE_CONFIG[item.type];
						const Icon = config.icon;
						return (
							<div
								key={item.id}
								className="group flex items-start gap-3 rounded-lg border border-app-line/50 bg-app-lightBox/20 px-3 py-2.5 transition-colors hover:bg-app-lightBox/40"
							>
								<Icon
									className={`mt-0.5 h-4 w-4 shrink-0 ${config.iconClass}`}
								/>
								<div className="min-w-0 flex-1">
									<p className="truncate text-sm text-ink">{item.title}</p>
									<div className="mt-0.5 flex items-center gap-2">
										<span className="text-tiny text-ink-faint">{item.agent}</span>
										<span className="text-tiny text-ink-faint/50">·</span>
										<span className="text-tiny text-ink-faint">{item.timeAgo}</span>
									</div>
								</div>
								<button className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-tiny text-ink-faint transition-colors hover:bg-accent/10 hover:text-accent">
									{config.action}
									<ArrowRight className="h-3 w-3" />
								</button>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
