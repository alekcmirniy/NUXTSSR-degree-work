export default defineNuxtRouteMiddleware(async (to) => {
    const { fetch, loggedIn } = useUserSession();

    try {
        await fetch();

        if (!loggedIn.value && to.path !== "/login") {
            return navigateTo("/login");
        }
    } catch {
        return navigateTo("/login");
    }
});
