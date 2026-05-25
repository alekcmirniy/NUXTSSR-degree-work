import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~~/server/db/index";

import { userFavoritesTable } from "~~/server/db/favoritesSchema";

const favoriteSchema = z.object({
    source: z.string().trim().default("vk"),
    ownerId: z.coerce.number().int(),
    postId: z.coerce.number().int(),
    title: z.string().trim().min(1),
    text: z.string().trim().nullable().optional(),
    author: z.string().trim().nullable().optional(),
    authorAvatar: z.string().trim().nullable().optional(),
    coverImage: z.string().trim().nullable().optional(),
    postDate: z.string().trim().nullable().optional(),
});

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event);

    const body = favoriteSchema.parse(await readBody(event));

    const existing = db
        .select({ id: userFavoritesTable.id })
        .from(userFavoritesTable)
        .where(
            and(
                eq(userFavoritesTable.userId, session.user.id),
                eq(userFavoritesTable.source, body.source),
                eq(userFavoritesTable.ownerId, body.ownerId),
                eq(userFavoritesTable.postId, body.postId),
            ),
        )
        .get();

    if (existing) {
        db.delete(userFavoritesTable)
            .where(eq(userFavoritesTable.id, existing.id))
            .run();

        return {
            action: "removed" as const,
            id: existing.id,
        };
    }

    const result = db
        .insert(userFavoritesTable)
        .values({
            userId: session.user.id,
            source: body.source,
            ownerId: body.ownerId,
            postId: body.postId,
            title: body.title,
            text: body.text ?? null,
            author: body.author ?? null,
            authorAvatar: body.authorAvatar ?? null,
            coverImage: body.coverImage ?? null,
            postDate: body.postDate ?? null,
        })
        .run();

    return {
        action: "added" as const,
        id: Number(result.lastInsertRowid),
    };
});
