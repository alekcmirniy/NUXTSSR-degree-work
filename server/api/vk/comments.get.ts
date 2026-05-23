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

    const ownerId = Number(query.owner_id ?? config.groupOwnerId);
    const postId = Number(query.post_id);
    const count = Math.min(Math.max(Number(query.count ?? 10), 1), 100);
    const offset = Math.max(Number(query.offset ?? 0), 0);

    if (!ownerId || !postId) {
        throw createError({
            statusCode: 400,
            statusMessage: "owner_id and post_id are required",
        });
    }

    const res = await $fetch("https://api.vk.com/method/wall.getComments", {
        params: {
            owner_id: ownerId,
            post_id: postId,
            count,
            offset,
            extended: 1,
            fields: "photo_50,photo_100,screen_name",
            access_token: token,
            v: "5.199",
        },
    });

    return res;
});
