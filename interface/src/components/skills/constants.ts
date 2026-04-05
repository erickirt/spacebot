import type {BundledSkill} from "./types";
import type {RegistryView} from "@/api/client";

export const REGISTRY_VIEWS: {key: RegistryView; label: string}[] = [
	{key: "all-time", label: "All Time"},
	{key: "trending", label: "Trending"},
	{key: "hot", label: "Hot"},
];

export const BUNDLED_SKILLS: BundledSkill[] = [
	{
		id: "web-search",
		name: "web-search",
		category: "Research",
		description: "Search the web using DuckDuckGo and retrieve structured results.",
		content: `# web-search

Search the web for information using DuckDuckGo.

## Tools

- \`web_search(query: string, limit?: number)\` — Returns a list of results with title, URL, and snippet.

## Usage

Use this skill when you need to look up current information, verify facts, or research topics that may not be in your training data.

## Notes

- Results are limited to public web content
- For best results, use specific queries
- Combine with \`read-url\` to fetch full page content
`,
	},
	{
		id: "code-review",
		name: "code-review",
		category: "Development",
		description: "Review code diffs and provide structured, actionable feedback.",
		content: `# code-review

Perform structured code reviews with categorized feedback.

## Tools

- \`review_diff(diff: string, context?: string)\` — Analyzes a unified diff and returns findings organized by severity.

## Severity Levels

- **critical** — Bugs, security issues, data loss risks
- **warning** — Code smells, performance concerns, unclear intent
- **suggestion** — Style, naming, minor improvements

## Usage

Pass a git diff or patch file. Optionally include surrounding context such as the PR description or ticket.
`,
	},
	{
		id: "github-pr",
		name: "github-pr",
		category: "Development",
		description: "Create, update, and review GitHub pull requests programmatically.",
		content: `# github-pr

Manage GitHub pull requests from within your agent.

## Tools

- \`create_pr(repo, title, body, head, base)\` — Opens a new pull request
- \`list_prs(repo, state?)\` — Lists open or closed PRs
- \`get_pr(repo, number)\` — Fetches PR details and diff
- \`add_comment(repo, number, body)\` — Posts a review comment

## Auth

Requires \`GITHUB_TOKEN\` in environment. Scopes needed: \`repo\`.
`,
	},
	{
		id: "file-manager",
		name: "file-manager",
		category: "Utilities",
		description: "Read, write, move, and organize files on the local filesystem.",
		content: `# file-manager

Interact with the local filesystem safely.

## Tools

- \`read_file(path)\` — Read file contents
- \`write_file(path, content)\` — Write or overwrite a file
- \`list_dir(path)\` — List directory contents
- \`move_file(src, dst)\` — Move or rename a file
- \`delete_file(path)\` — Delete a file (moves to trash by default)

## Sandboxing

Operations are restricted to the agent's working directory unless the \`sandbox.writable_paths\` config is expanded.
`,
	},
	{
		id: "email-draft",
		name: "email-draft",
		category: "Communication",
		description: "Compose and send emails via connected Gmail or SMTP accounts.",
		content: `# email-draft

Draft and send emails through connected mail accounts.

## Tools

- \`compose(to, subject, body)\` — Creates a draft
- \`send(draft_id)\` — Sends an existing draft
- \`list_drafts()\` — Lists pending drafts
- \`search_inbox(query)\` — Searches inbox with Gmail query syntax

## Auth

Requires OAuth connection to Gmail or SMTP credentials in config.
`,
	},
	{
		id: "calendar",
		name: "calendar",
		category: "Communication",
		description: "Query and create events on Google Calendar or CalDAV accounts.",
		content: `# calendar

Access and manage calendar events.

## Tools

- \`list_events(start, end)\` — Returns events in a date range
- \`create_event(title, start, end, attendees?)\` — Creates a new event
- \`find_availability(attendees, duration)\` — Suggests open meeting slots

## Auth

Requires OAuth connection to Google Calendar or a CalDAV server URL in config.
`,
	},
	{
		id: "sql-query",
		name: "sql-query",
		category: "Data",
		description: "Execute read-only SQL queries against configured database connections.",
		content: `# sql-query

Run SQL queries against configured data sources.

## Tools

- \`query(sql, connection?)\` — Executes a SELECT statement and returns rows as JSON
- \`list_tables(connection?)\` — Lists available tables and schemas
- \`describe_table(table, connection?)\` — Returns column definitions

## Safety

Only SELECT statements are permitted. Mutations require explicit config opt-in via \`sql.allow_writes = true\`.

## Config

Set \`sql.connection_string\` in agent config to point to your database.
`,
	},
	{
		id: "slack-notify",
		name: "slack-notify",
		category: "Communication",
		description: "Send messages and notifications to Slack channels or users.",
		content: `# slack-notify

Post messages to Slack from your agent.

## Tools

- \`send_message(channel, text)\` — Posts a message to a channel or DM
- \`send_blocks(channel, blocks)\` — Posts a rich Block Kit message
- \`list_channels()\` — Lists available channels

## Auth

Requires \`SLACK_BOT_TOKEN\` in environment or agent config. Bot must be invited to target channels.
`,
	},
];
