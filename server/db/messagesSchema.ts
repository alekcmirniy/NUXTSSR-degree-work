import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { usersTable } from "./usersSchema";
import { conversationsTable } from "./conversationsSchema";

export const messagesTable = sqliteTable("messages", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    conversationId: integer("conversation_id")
        .notNull()
        .references(() => conversationsTable.id, { onDelete: "cascade" }),
    senderId: integer("sender_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    readAt: integer("read_at", { mode: "timestamp_ms" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
        .notNull()
        .default(sql`(unixepoch() * 1000)`),
});
