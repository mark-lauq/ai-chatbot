CREATE TABLE `message` (
	`id` text,
	`chatId` text,
	`role` text,
	`parts` text,
	FOREIGN KEY (`chatId`) REFERENCES `chat`(`id`) ON UPDATE no action ON DELETE no action
);
