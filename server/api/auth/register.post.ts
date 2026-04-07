import { usersTable } from "~~/server/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const db = useDrizzle();
    const body = await readBody(event);

    const { email, password } = body;
    const emailNormalized = (email as string).toLowerCase().trim();

    const existingUser = db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, emailNormalized))
        .get();

    if (existingUser) {
        throw createError({
            statusCode: 400,
            statusMessage: "User already exist",
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUserId = db
        .insert(usersTable)
        .values({ email: emailNormalized, passwordHash })
        .run().lastInsertRowid;

    console.log(newUserId);

    if (!newUserId)
        throw createError({
            statusCode: 500,
            statusMessage: "Cannot create user",
        });

    return { success: true };
});
