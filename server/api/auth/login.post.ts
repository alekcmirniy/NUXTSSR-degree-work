import { usersTable } from "~~/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
    const db = useDrizzle();
    const body = await readBody(event);

    const { email, password } = body;

    const user = db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .get();

    if (!user)
        throw createError({ statusCode: 401, statusMessage: "User not found" });

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid)
        throw createError({ statusCode: 401, statusMessage: "Wrong password" });

    await setUserSession(event, {
        user: { id: user.id, email: user.email },
    });

    return { success: true };
});
