// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    ssr: true,
    modules: ["@pinia/nuxt"],
    typescript: {
        strict: true, // включить строгий режим
        typeCheck: true, // проверять типы при сборке
    },
});
