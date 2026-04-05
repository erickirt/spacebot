import type {SkillInfo, RegistrySkill} from "@/api/client";

export type SkillView = "directory" | "bundled" | "create";

export interface BundledSkill {
	id: string;
	name: string;
	description: string;
	category: string;
	content: string;
}

export type SelectedSkill =
	| {type: "installed"; skill: SkillInfo}
	| {type: "registry"; skill: RegistrySkill}
	| {type: "bundled"; skill: BundledSkill};
