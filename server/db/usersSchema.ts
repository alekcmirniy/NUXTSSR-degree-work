import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    surname: text("surname").notNull(),
    patronymic: text("patronymic"),
    passwordHash: text("password_hash").notNull(),

    role: text("role", {
        enum: ["student", "teacher"],
    })
        .notNull()
        .default("student"),

    group: text("group"),
    department: text("department"),
    bio: text("bio"),
    avatarUrl: text("avatar_url"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
        .notNull()
        .default(new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
        .notNull()
        .default(new Date()),
});
