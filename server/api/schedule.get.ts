import { eq } from "drizzle-orm";
import { z } from "zod";

import { scheduleCache } from "~~/server/db/scheduleSchema";

import { getInternalGroupId } from "~~/server/utils/schedule/group-map";
import { parseSchedule } from "~~/server/utils/schedule/parser";

const db = useDrizzle();

const querySchema = z.object({
    group: z.string().trim().min(1, "Введите номер группы"),
});

export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const parsedQuery = querySchema.safeParse(query);

    if (!parsedQuery.success) {
        throw createError({
            statusCode: 400,
            statusMessage: "Некорректный номер группы",
        });
    }

    const group = parsedQuery.data.group;

    const cached = db
        .select()
        .from(scheduleCache)
        .where(eq(scheduleCache.group, group))
        .get();

    const now = Date.now();

    if (cached) {
        const cacheAge = now - new Date(cached.updatedAt).getTime();

        const ONE_HOUR = 1000 * 60 * 60;

        if (cacheAge < ONE_HOUR) {
            return JSON.parse(cached.payload);
        }
    }

    let internalGroupId = cached?.internalGroupId || null;

    if (!internalGroupId) {
        internalGroupId = await getInternalGroupId(group);
    }

    if (!internalGroupId) {
        throw createError({
            statusCode: 404,
            statusMessage: "Группа не найдена",
        });
    }

    const parsedSchedule = await parseSchedule(group, internalGroupId);

    const payload = JSON.stringify(parsedSchedule);

    if (cached) {
        await db
            .update(scheduleCache)
            .set({
                payload,
                updatedAt: new Date(),
            })
            .where(eq(scheduleCache.group, group));
    } else {
        await db.insert(scheduleCache).values({
            group,
            internalGroupId,
            payload,
            updatedAt: new Date(),
        });
    }

    return parsedSchedule;
});
