export default defineNuxtRouteMiddleware(async () => {
    try {
        const { fetch, loggedIn } = useUserSession();
        await fetch();

        if (!loggedIn.value) {
            await navigateTo("/login");
        }
    } catch {
        return await navigateTo("/login");
    }
});
