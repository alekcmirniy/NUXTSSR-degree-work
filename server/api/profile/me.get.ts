import { eq } from "drizzle-orm";
import { db } from "~~/server/db/index";

import { usersTable } from "~~/server/db/usersSchema";

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event);

    const profile = db
        .select({
            id: usersTable.id,
            email: usersTable.email,

            name: usersTable.name,
            surname: usersTable.surname,
            patronymic: usersTable.patronymic,

            role: usersTable.role,

            group: usersTable.group,
            department: usersTable.department,

            bio: usersTable.bio,
            avatarUrl: usersTable.avatarUrl,

            headline: usersTable.headline,
            location: usersTable.location,

            createdAt: usersTable.createdAt,
            updatedAt: usersTable.updatedAt,
        })
        .from(usersTable)
        .where(eq(usersTable.id, session.user.id))
        .get();

    if (!profile) {
        throw createError({
            statusCode: 404,
            statusMessage: "Профиль не найден",
        });
    }

    return {
        ...profile,
        createdAt: profile.createdAt
            ? new Date(profile.createdAt as unknown as number).toISOString()
            : null,
        updatedAt: profile.updatedAt
            ? new Date(profile.updatedAt as unknown as number).toISOString()
            : null,
    };
});
