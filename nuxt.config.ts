import { defineNuxtConfig } from "nuxt/config";

// nuxt.config.ts
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    ssr: true,
    modules: [
        "@pinia/nuxt",
        "@nuxtjs/tailwindcss", // добавьте этот модуль
    ],
    typescript: {
        strict: true,
        typeCheck: true,
    },
    css: ["./app/assets/main.scss"],
});
