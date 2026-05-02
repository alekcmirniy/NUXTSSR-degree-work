export const useWatchSession = () => {
    const { loggedIn } = useUserSession();

    watch(
        loggedIn,
        () => {
            if (!loggedIn.value) navigateTo("/login");
        },
        { immediate: true },
    );
};
