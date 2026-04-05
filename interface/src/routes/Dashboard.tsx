import { ActionItemsCard } from "@/components/dashboard/ActionItemsCard";
import { TokenUsageCard } from "@/components/dashboard/TokenUsageCard";
import { RecentActivityCard } from "@/components/dashboard/RecentActivityCard";
import { GetSpacedriveCard } from "@/components/dashboard/GetSpacedriveCard";

export function Dashboard() {
	return (
		<div className="flex h-full flex-col">
			<div className="flex-1 overflow-y-auto">
				<div className="mx-auto max-w-6xl p-6 pb-12">
					{/* Top grid: Action Items (left, tall) + Token Usage + Get Spacedrive (right, stacked) */}
					<div className="grid grid-cols-2 gap-5">
						<div className="row-span-2">
							<ActionItemsCard />
						</div>
						<TokenUsageCard />
						<GetSpacedriveCard />
					</div>

					{/* Recent Activity: full width */}
					<div className="mt-5">
						<RecentActivityCard />
					</div>
				</div>
			</div>
		</div>
	);
}
