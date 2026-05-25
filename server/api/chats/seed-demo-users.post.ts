import bcrypt from "bcrypt";
import { usersTable } from "~~/server/db/usersSchema";
import { db } from "~~/server/db/index";

export default defineEventHandler(async () => {
    if (process.env.NODE_ENV === "production") {
        throw createError({
            statusCode: 403,
            statusMessage: "Недоступно в production",
        });
    }

    const passwordHash = await bcrypt.hash("demo12345", 10);

    const demoRows = [
        {
            email: "student1@example.com",
            name: "Иван",
            surname: "Петров",
            patronymic: "Андреевич",
            passwordHash,
            role: "student",
            group: "2253",
            department: "Кафедра 25",
            bio: "Люблю интерфейсы, Nuxt и аккуратные продукты.",
            avatarUrl: null,
        },
        {
            email: "student2@example.com",
            name: "Мария",
            surname: "Иванова",
            patronymic: "Сергеевна",
            passwordHash,
            role: "student",
            group: "2251",
            department: "Кафедра 25",
            bio: "Слежу за учебными событиями и делаю проекты.",
            avatarUrl: null,
        },
        {
            email: "teacher1@example.com",
            name: "Алексей",
            surname: "Смирнов",
            patronymic: "Олегович",
            passwordHash,
            role: "teacher",
            group: null,
            department: "Инженерная школа ГУАП",
            bio: "Преподаю дисциплины по сетям и информационным системам.",
            avatarUrl: null,
        },
        {
            email: "teacher2@example.com",
            name: "Екатерина",
            surname: "Кузнецова",
            patronymic: "Игоревна",
            passwordHash,
            role: "teacher",
            group: null,
            department: "Кафедра 25",
            bio: "Работаю с учебным процессом и сопровождением дисциплин.",
            avatarUrl: null,
        },
    ];

    for (const row of demoRows) {
        db.insert(usersTable)
            .values(row as any)
            .run();
    }

    return { ok: true, inserted: demoRows.length, password: "demo12345" };
});
