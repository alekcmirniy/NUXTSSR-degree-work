ALTER TABLE `users` ADD `role` text DEFAULT 'student' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `group` text;--> statement-breakpoint
ALTER TABLE `users` ADD `department` text;--> statement-breakpoint
ALTER TABLE `users` ADD `bio` text;--> statement-breakpoint
ALTER TABLE `users` ADD `avatar_url` text;--> statement-breakpoint
ALTER TABLE `users` ADD `created_at` integer DEFAULT '"2026-05-14T13:44:43.068Z"' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `updated_at` integer DEFAULT '"2026-05-14T13:44:43.069Z"' NOT NULL;