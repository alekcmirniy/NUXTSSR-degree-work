import { defineNuxtConfig } from "nuxt/config";

// nuxt.config.ts
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    ssr: true,
    modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "@nuxt/fonts"],
    typescript: {
        strict: true,
        typeCheck: false,
    },
    css: ["./app/assets/main.scss"],
    vite: {
        optimizeDeps: {
            include: ["@vue/devtools-core", "@vue/devtools-kit"],
        },
    },
});
