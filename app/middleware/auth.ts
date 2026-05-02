export default defineNuxtRouteMiddleware(async () => {
    try {
        const { fetch, loggedIn } = useUserSession();
        await fetch();

        if (!loggedIn.value) {
            navigateTo("/login");
        }
    } catch {
        return navigateTo("/login");
    }
});
