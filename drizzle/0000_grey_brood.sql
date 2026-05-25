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
CREATE TABLE `messages` (
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
CREATE TABLE `schedule_cache` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`group` text NOT NULL,
	`internal_group_id` text NOT NULL,
	`payload` text NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `schedule_cache_group_unique` ON `schedule_cache` (`group`);--> statement-breakpoint
CREATE TABLE `users` (
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
	`headline` text,
	`location` text,
	`created_at` integer DEFAULT '"2026-05-25T21:30:53.956Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-25T21:30:53.956Z"' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `user_favorites` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`source` text DEFAULT 'vk' NOT NULL,
	`owner_id` integer NOT NULL,
	`post_id` integer NOT NULL,
	`title` text NOT NULL,
	`text` text,
	`author` text,
	`author_avatar` text,
	`cover_image` text,
	`post_date` text,
	`created_at` integer DEFAULT '"2026-05-25T21:30:53.979Z"' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_favorite_unique` ON `user_favorites` (`user_id`,`source`,`owner_id`,`post_id`);--> statement-breakpoint
CREATE TABLE `vitals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer NOT NULL,
	`build` text NOT NULL,
	`pathname` text NOT NULL,
	`metric` text NOT NULL,
	`value` real NOT NULL,
	`rating` text NOT NULL,
	`navigation_type` text,
	`attribution` text
);
