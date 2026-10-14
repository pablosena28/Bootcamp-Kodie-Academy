CREATE TABLE `request_events` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`created_at` text NOT NULL,
	`message` text NOT NULL,
	FOREIGN KEY (`request_id`) REFERENCES `support_requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `support_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`alias` text NOT NULL,
	`group_name` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`priority` text NOT NULL,
	`owner` text NOT NULL,
	`status` text NOT NULL,
	`created_at` text NOT NULL,
	`due_at` text NOT NULL
);
