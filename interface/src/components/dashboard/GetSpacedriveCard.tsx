import { AppleLogo, AndroidLogo, Desktop, BookOpen, DiscordLogo, ArrowSquareOut } from "@phosphor-icons/react";

interface DownloadLink {
	label: string;
	platform: string;
	icon: React.ElementType;
	href: string;
}

const DOWNLOADS: DownloadLink[] = [
	{
		label: "macOS",
		platform: "macOS",
		icon: AppleLogo,
		href: "https://spacedrive.com/download",
	},
	{
		label: "iOS",
		platform: "iOS",
		icon: AppleLogo,
		href: "https://spacedrive.com/download",
	},
	{
		label: "Android",
		platform: "Android",
		icon: AndroidLogo,
		href: "https://spacedrive.com/download",
	},
	{
		label: "Windows",
		platform: "Windows",
		icon: Desktop,
		href: "https://spacedrive.com/download",
	},
];

export function GetSpacedriveCard() {
	return (
		<div className="rounded-xl bg-app-dark-box p-5">
			<div className="mb-1 flex items-center justify-between">
				<h2 className="font-plex text-sm font-medium text-ink-dull">Get Spacedrive</h2>
			</div>
			<p className="mb-4 text-tiny text-ink-faint leading-relaxed">
				Your files, your agents, your data — on every device.
			</p>

			<div className="mb-4 grid grid-cols-2 gap-2">
				{DOWNLOADS.map(({ label, icon: Icon, href }) => (
					<a
						key={label}
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 rounded-lg border border-app-line/60 px-3 py-2 text-sm text-ink-dull transition-colors hover:border-app-line hover:bg-app-lightBox/30 hover:text-ink"
					>
						<Icon className="h-4 w-4 shrink-0 text-ink-faint" />
						{label}
					</a>
				))}
			</div>

			<div className="flex items-center gap-2 border-t border-app-line/40 pt-4">
				<a
					href="https://docs.spacedrive.com"
					target="_blank"
					rel="noopener noreferrer"
					className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-app-line/60 px-3 py-1.5 text-tiny text-ink-faint transition-colors hover:border-app-line hover:text-ink-dull"
				>
					<BookOpen className="h-3.5 w-3.5" />
					Docs
					<ArrowSquareOut className="h-3 w-3 opacity-50" />
				</a>
				<a
					href="https://discord.gg/spacedrive"
					target="_blank"
					rel="noopener noreferrer"
					className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-app-line/60 px-3 py-1.5 text-tiny text-ink-faint transition-colors hover:border-app-line hover:text-ink-dull"
				>
					<DiscordLogo className="h-3.5 w-3.5" />
					Discord
					<ArrowSquareOut className="h-3 w-3 opacity-50" />
				</a>
			</div>
		</div>
	);
}
