import { usersTable } from "~~/server/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const db = useDrizzle();
    const body = await readBody(event);

    const { email, password, ...rest } = body;
    const emailNormalized = (email as string).toLowerCase().trim();
    const nameNormalized = (rest.name as string).trim();
    const surnameNormalized = (rest.surname as string).trim();
    const patronymicNormalized = (rest.patronymic || "").trim();

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
        .values({
            email: emailNormalized,
            passwordHash,
            name: nameNormalized,
            surname: surnameNormalized,
            patronymic: patronymicNormalized,
        })
        .run().lastInsertRowid;

    if (!newUserId)
        throw createError({
            statusCode: 500,
            statusMessage: "Cannot create user",
        });

    await setUserSession(event, {
        user: {
            id: newUserId,
            email,
            name: nameNormalized,
            surname: surnameNormalized,
            patronymic: patronymicNormalized,
        },
    });

    return { success: true };
});
