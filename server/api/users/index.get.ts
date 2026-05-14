import { eq, like, or, and } from "drizzle-orm";
import { z } from "zod";

import { usersTable } from "~~/server/db/usersSchema";
import { demoUsers } from "~~/server/utils/demo-users";
import type { UserPreview } from "~/utils/interfaces/users";

const querySchema = z.object({
    role: z.enum(["student", "teacher"]).optional(),
    search: z.string().trim().optional(),
    group: z.string().trim().optional(),
    department: z.string().trim().optional(),
});

function matchesDemoUser(
    user: UserPreview,
    query: z.infer<typeof querySchema>,
) {
    const search = query.search?.toLowerCase().trim();
    const fullName =
        `${user.surname} ${user.name} ${user.patronymic || ""}`.toLowerCase();
    const department = (user.department || "").toLowerCase();
    const group = (user.group || "").toLowerCase();

    if (query.role && user.role !== query.role) return false;
    if (query.group && group !== query.group.toLowerCase()) return false;
    if (
        query.department &&
        !department.includes(query.department.toLowerCase())
    )
        return false;
    if (
        search &&
        !fullName.includes(search) &&
        !department.includes(search) &&
        !group.includes(search)
    )
        return false;

    return true;
}

export default defineEventHandler(async (event) => {
    const db = useDrizzle();

    const query = getQuery(event);
    const parsed = querySchema.safeParse(query);

    if (!parsed.success) {
        throw createError({
            statusCode: 400,
            statusMessage: "Некорректные параметры поиска",
        });
    }

    const q = parsed.data;

    // Если таблица пользователей ещё пустая, отдаём демо-данные.
    const rows = await db.select().from(usersTable).all();

    if (!rows.length) {
        return demoUsers.filter((user) => matchesDemoUser(user, q));
    }

    const filters = [] as any[];

    if (q.role) filters.push(eq(usersTable.role, q.role));
    if (q.group) filters.push(eq(usersTable.group, q.group));
    if (q.department)
        filters.push(like(usersTable.department, `%${q.department}%`));

    const search = q.search;

    const result = await db
        .select({
            id: usersTable.id,
            name: usersTable.name,
            surname: usersTable.surname,
            patronymic: usersTable.patronymic,
            role: usersTable.role,
            group: usersTable.group,
            department: usersTable.department,
            bio: usersTable.bio,
            avatarUrl: usersTable.avatarUrl,
        })
        .from(usersTable)
        .where(
            and(
                ...(filters.length ? filters : []),
                search
                    ? or(
                          like(usersTable.name, `%${search}%`),
                          like(usersTable.surname, `%${search}%`),
                          like(usersTable.patronymic, `%${search}%`),
                          like(usersTable.department, `%${search}%`),
                          like(usersTable.group, `%${search}%`),
                      )
                    : undefined,
            ),
        )
        .all();

    return result;
});
