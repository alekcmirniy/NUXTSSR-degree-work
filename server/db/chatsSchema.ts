import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { usersTable } from "./usersSchema";

export const conversationsTable = sqliteTable("conversations", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    pairKey: text("pair_key").notNull().unique(),
    participantAId: integer("participant_a_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    participantBId: integer("participant_b_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
        .notNull()
        .default(sql`(unixepoch() * 1000)`),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
        .notNull()
        .default(sql`(unixepoch() * 1000)`),
});

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
