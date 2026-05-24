import { desc, eq } from "drizzle-orm";

import { userFavoritesTable } from "~~/server/db/favoritesSchema";

export default defineEventHandler(async (event) => {
    const db = useDrizzle();
    const session = await requireUserSession(event);

    const rows = db
        .select()
        .from(userFavoritesTable)
        .where(eq(userFavoritesTable.userId, session.user.id))
        .orderBy(desc(userFavoritesTable.createdAt))
        .all();

    return rows.map((row) => ({
        ...row,
        createdAt: new Date(row.createdAt as unknown as number).toISOString(),
    }));
});
