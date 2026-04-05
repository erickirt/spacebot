import {cx} from "class-variance-authority";
import {Package} from "@phosphor-icons/react";
import {BUNDLED_SKILLS} from "./constants";
import type {BundledSkill, SelectedSkill} from "./types";

interface BundledSkillsProps {
	selectedSkill: SelectedSkill | null;
	onSelectSkill: (skill: BundledSkill) => void;
}

const CATEGORIES = Array.from(new Set(BUNDLED_SKILLS.map((s) => s.category)));

export function BundledSkills({selectedSkill, onSelectSkill}: BundledSkillsProps) {
	const selectedBundledId =
		selectedSkill?.type === "bundled" ? selectedSkill.skill.id : null;

	return (
		<div className="flex h-full flex-col">
			<div className="border-b border-app-line/50 px-5 py-3">
				<h2 className="text-sm font-medium text-ink">Bundled Skills</h2>
				<p className="mt-0.5 text-xs text-ink-faint">
					Built-in skills included with every agent. Coming soon — these will be
					configurable per agent.
				</p>
			</div>

			<div className="flex-1 overflow-y-auto px-5 py-4">
				{CATEGORIES.map((category) => (
					<div key={category} className="mb-6">
						<div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
							{category}
						</div>
						<div className="space-y-1">
							{BUNDLED_SKILLS.filter((s) => s.category === category).map((skill) => (
								<button
									key={skill.id}
									onClick={() => onSelectSkill(skill)}
									className={cx(
										"flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
										selectedBundledId === skill.id
											? "bg-app-line text-ink"
											: "hover:bg-app-dark-box/40 text-ink-dull hover:text-ink",
									)}
								>
									<div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-app-dark-box/60">
										<Package className="size-3.5 text-ink-faint" weight="duotone" />
									</div>
									<div className="min-w-0 flex-1">
										<div className="truncate text-sm font-medium text-ink">
											{skill.name}
										</div>
										<div className="truncate text-xs text-ink-faint">
											{skill.description}
										</div>
									</div>
									<span className="shrink-0 rounded bg-app-dark-box/80 px-1.5 py-0.5 text-[10px] text-ink-dull">
										bundled
									</span>
								</button>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
