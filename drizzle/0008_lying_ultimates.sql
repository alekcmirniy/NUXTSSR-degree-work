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
	`created_at` integer DEFAULT '"2026-05-14T15:14:32.946Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2026-05-14T15:14:32.947Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "email", "name", "surname", "patronymic", "password_hash", "role", "group", "department", "bio", "avatar_url", "created_at", "updated_at") SELECT "id", "email", "name", "surname", "patronymic", "password_hash", "role", "group", "department", "bio", "avatar_url", "created_at", "updated_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);