export default defineNuxtPlugin(() => {
    const fetchInstanse = $fetch.create({
        onResponseError({ response }) {
            if (response.status === 401) {
                navigateTo("/login");
            }
        },
    });

    return {
        provide: {
            fetchInstanse,
        },
    };
});
