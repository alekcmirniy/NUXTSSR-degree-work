import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const vitals = sqliteTable("vitals", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    build: text("build").notNull(), // before | after
    pathname: text("pathname").notNull(),
    metric: text("metric").notNull(), // LCP | INP | CLS | FCP | TTFB
    value: real("value").notNull(),
    rating: text("rating").notNull(),
    navigationType: text("navigation_type"),
    attribution: text("attribution"),
});
