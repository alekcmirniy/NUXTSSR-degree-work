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
--> statement-breakpoint
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
	`headline` text,
	`location` text,
	`created_at` integer DEFAULT '"2026-05-25T19:05:12.153Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-25T19:05:12.154Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "email", "name", "surname", "patronymic", "password_hash", "role", "group", "department", "bio", "avatar_url", "headline", "location", "created_at", "updated_at") SELECT "id", "email", "name", "surname", "patronymic", "password_hash", "role", "group", "department", "bio", "avatar_url", "headline", "location", "created_at", "updated_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `__new_user_favorites` (
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
	`created_at` integer DEFAULT '"2026-05-25T19:05:12.267Z"' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_user_favorites`("id", "user_id", "source", "owner_id", "post_id", "title", "text", "author", "author_avatar", "cover_image", "post_date", "created_at") SELECT "id", "user_id", "source", "owner_id", "post_id", "title", "text", "author", "author_avatar", "cover_image", "post_date", "created_at" FROM `user_favorites`;--> statement-breakpoint
DROP TABLE `user_favorites`;--> statement-breakpoint
ALTER TABLE `__new_user_favorites` RENAME TO `user_favorites`;--> statement-breakpoint
CREATE UNIQUE INDEX `user_favorite_unique` ON `user_favorites` (`user_id`,`source`,`owner_id`,`post_id`);