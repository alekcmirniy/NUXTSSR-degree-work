// server/api/vk.ts
export default defineEventHandler(async () => {
    const token =
        "ac28c211ac28c211ac28c21133af175a94aac28ac28c211c5971a43961675a8bbcda07d";
    const groupId = -122496494;

    const res = await $fetch("https://api.vk.com/method/wall.get", {
        params: {
            owner_id: groupId,
            count: 20,
            access_token: token,
            v: "5.199",
        },
    });

    return res;
});
