import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
    id: int().primaryKey({ autoIncrement: true }),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    surname: text("surname").notNull(),
    patronymic: text("patronymic"),
    passwordHash: text("password_hash").notNull(),
});
