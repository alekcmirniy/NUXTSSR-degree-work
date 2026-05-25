import { eq } from "drizzle-orm";
import { usersTable } from "~~/server/db/usersSchema";
import { db } from "~~/server/db/index";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, "id"));

    if (!Number.isFinite(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: "Некорректный id пользователя",
        });
    }

    const row = db
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
            createdAt: usersTable.createdAt,
            updatedAt: usersTable.updatedAt,
        })
        .from(usersTable)
        .where(eq(usersTable.id, id))
        .get();

    if (row) {
        return {
            ...row,
            createdAt: new Date(
                row.createdAt as unknown as number,
            ).toISOString(),
            updatedAt: new Date(
                row.updatedAt as unknown as number,
            ).toISOString(),
        };
    }
});
