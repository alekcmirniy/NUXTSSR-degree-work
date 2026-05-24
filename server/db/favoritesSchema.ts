import {
    integer,
    sqliteTable,
    text,
    uniqueIndex,
} from "drizzle-orm/sqlite-core";

import { usersTable } from "./usersSchema";

export const userFavoritesTable = sqliteTable(
    "user_favorites",
    {
        id: integer("id").primaryKey({ autoIncrement: true }),

        userId: integer("user_id")
            .notNull()
            .references(() => usersTable.id, { onDelete: "cascade" }),

        source: text("source").notNull().default("vk"),

        ownerId: integer("owner_id").notNull(),
        postId: integer("post_id").notNull(),

        title: text("title").notNull(),
        text: text("text"),
        author: text("author"),
        authorAvatar: text("author_avatar"),
        coverImage: text("cover_image"),
        postDate: text("post_date"),

        createdAt: integer("created_at", { mode: "timestamp_ms" })
            .notNull()
            .default(new Date()),
    },
    (table) => ({
        uniqueFavorite: uniqueIndex("user_favorite_unique").on(
            table.userId,
            table.source,
            table.ownerId,
            table.postId,
        ),
    }),
);
