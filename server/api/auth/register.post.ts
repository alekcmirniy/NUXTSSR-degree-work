import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "~~/server/db/index";

import { usersTable } from "~~/server/db/usersSchema";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { email, password, isTeacher, ...rest } = body;

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
            statusMessage: "User already exists",
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const role = isTeacher === true ? "teacher" : "student";

    const insertResult = db
        .insert(usersTable)
        .values({
            email: emailNormalized,

            passwordHash,

            name: nameNormalized,
            surname: surnameNormalized,
            patronymic: patronymicNormalized,

            role,
        })
        .run();

    const newUserId = Number(insertResult.lastInsertRowid);

    if (!newUserId) {
        throw createError({
            statusCode: 500,
            statusMessage: "Cannot create user",
        });
    }

    await setUserSession(event, {
        user: {
            id: newUserId,

            email: emailNormalized,

            name: nameNormalized,
            surname: surnameNormalized,
            patronymic: patronymicNormalized,

            role,
        },
    });

    return {
        success: true,
    };
});
