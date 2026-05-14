CREATE TABLE `conversations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pair_key` text NOT NULL,
	`participant_a_id` integer NOT NULL,
	`participant_b_id` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`participant_a_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`participant_b_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `conversations_pair_key_unique` ON `conversations` (`pair_key`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`surname` text NOT NULL,
	`patronymic` text,
	`password_hash` text NOT NULL,
	`role` text DEFAULT 'student' NOT NULL,
	`group` text,
	`department` text,
	`bio` text,
	`avatar_url` text,
	`created_at` integer DEFAULT '"2026-05-14T14:34:53.304Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-14T14:34:53.305Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "email", "name", "surname", "patronymic", "password_hash", "role", "group", "department", "bio", "avatar_url", "created_at", "updated_at") SELECT "id", "email", "name", "surname", "patronymic", "password_hash", "role", "group", "department", "bio", "avatar_url", "created_at", "updated_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `__new_messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`conversation_id` integer NOT NULL,
	`sender_id` integer NOT NULL,
	`content` text NOT NULL,
	`read_at` integer,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_messages`("id", "conversation_id", "sender_id", "content", "read_at", "created_at") SELECT "id", "conversation_id", "sender_id", "content", "read_at", "created_at" FROM `messages`;--> statement-breakpoint
DROP TABLE `messages`;--> statement-breakpoint
ALTER TABLE `__new_messages` RENAME TO `messages`;