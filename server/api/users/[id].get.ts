import { eq } from "drizzle-orm";
import { usersTable } from "~~/server/db/usersSchema";
import { demoUsers } from "~~/server/utils/demo-users";

export default defineEventHandler(async (event) => {
    const db = useDrizzle();
    const id = Number(getRouterParam(event, "id"));

    if (!Number.isFinite(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: "Некорректный id пользователя",
        });
    }

    const row = await db
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

    const demo = demoUsers.find((user) => user.id === id);

    if (!demo) {
        throw createError({
            statusCode: 404,
            statusMessage: "Пользователь не найден",
        });
    }

    return {
        ...demo,
        email:
            demo.role === "teacher"
                ? "teacher@example.com"
                : "student@example.com",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
});
