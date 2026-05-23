import { usersTable } from "~~/server/db/usersSchema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const db = useDrizzle();

    const session = await requireUserSession(event);

    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, session.user.id),
    });

    return user;
});
