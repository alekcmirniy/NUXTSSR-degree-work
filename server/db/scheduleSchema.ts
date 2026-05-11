import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const scheduleCache = sqliteTable("schedule_cache", {
    id: integer("id").primaryKey({ autoIncrement: true }),

    group: text("group").notNull().unique(),
    internalGroupId: text("internal_group_id").notNull(),

    payload: text("payload").notNull(),

    updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});
