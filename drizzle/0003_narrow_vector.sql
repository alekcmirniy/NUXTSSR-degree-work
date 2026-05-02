CREATE TABLE `messages` (
	`id` integer PRIMARY KEY NOT NULL,
	`sender_id` text NOT NULL,
	`receiver_id` text NOT NULL,
	`text` text NOT NULL,
	`created_at` integer NOT NULL
);
