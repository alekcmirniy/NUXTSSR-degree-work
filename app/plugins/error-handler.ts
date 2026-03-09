export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.errorHandler = (error, _, info) => {
        console.error("Глобальная ошибка Vue: ", error);
        console.error("Контекст ошибки: ", info);
    };
    nuxtApp.hook("vue:error", (error) => {
        console.error("Хук vue:error: ", error);
    });
});
