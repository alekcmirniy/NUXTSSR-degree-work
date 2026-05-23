import { createError, getQuery } from "h3";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const token = config.vkToken;

    if (!token) {
        throw createError({
            statusCode: 500,
            statusMessage: "VK token is not configured",
        });
    }

    const query = getQuery(event);

    const count = Math.min(Math.max(Number(query.count ?? 6), 1), 100);
    const offset = Math.max(Number(query.offset ?? 0), 0);
    const ownerId = Number(query.owner_id ?? config.groupOwnerId);

    const res = await $fetch("https://api.vk.com/method/wall.get", {
        params: {
            owner_id: ownerId,
            count,
            offset,
            extended: 1,
            access_token: token,
            v: "5.199",
        },
    });

    return res;
});
