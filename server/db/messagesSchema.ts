import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const messagesTable = sqliteTable("messages", {
    id: int().primaryKey(),
    senderId: text("sender_id").notNull(),
    receiverId: text("receiver_id").notNull(),
    text: text("text").notNull(),
    createdAt: int("created_at").notNull(),
});
