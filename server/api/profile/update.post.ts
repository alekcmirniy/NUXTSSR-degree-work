import { usersTable } from "~~/server/db/usersSchema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const db = useDrizzle();
    const body = await readBody(event);

    const session = await requireUserSession(event);

    await db
        .update(usersTable)
        .set({
            avatarUrl: body.avatarUrl,
            bio: body.bio,
            department: body.department,
            group: body.group,
        })
        .where(eq(usersTable.id, session.user.id));

    return { success: true };
});
