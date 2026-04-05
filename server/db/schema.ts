import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
    id: int().primaryKey({ autoIncrement: true }),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
});
