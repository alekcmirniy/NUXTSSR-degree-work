import { eq } from "drizzle-orm";
import { z } from "zod";

import { usersTable } from "~~/server/db/usersSchema";
import { db } from "~~/server/db/index";

const updateProfileSchema = z.object({
    avatarUrl: z.string().trim().nullable().optional(),
    bio: z.string().trim().nullable().optional(),
    department: z.string().trim().nullable().optional(),
    group: z.string().trim().nullable().optional(),
    headline: z.string().trim().nullable().optional(),
    location: z.string().trim().nullable().optional(),
});

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event);

    const rawBody = await readBody(event);

    const body = updateProfileSchema.parse((rawBody as any)?.body ?? rawBody);

    await db
        .update(usersTable)
        .set({
            avatarUrl: body.avatarUrl ?? null,
            bio: body.bio ?? null,
            department: body.department ?? null,
            group: body.group ?? null,
            headline: body.headline ?? null,
            location: body.location ?? null,
            updatedAt: new Date(),
        })
        .where(eq(usersTable.id, session.user.id));

    return {
        success: true,
    };
});
