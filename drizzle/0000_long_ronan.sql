CREATE TABLE `chat` (
	`id` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `message` (
	`id` text NOT NULL,
	`role` text NOT NULL,
	`content` text NOT NULL
);
