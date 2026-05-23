import { defineNuxtConfig } from "nuxt/config";

// nuxt.config.ts
export default defineNuxtConfig({
    components: {
        dirs: [
            "~/components/atoms",
            "~/components/organisms",
            "~/components/molecules",
        ],
    },
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    ssr: true,
    modules: [
        "@pinia/nuxt",
        "@nuxtjs/tailwindcss",
        "@nuxt/fonts",
        "nuxt-auth-utils",
        "@nuxt/ui",
    ],
    typescript: {
        strict: true,
        typeCheck: false,
        shim: true,
    },
    css: ["~/assets/css/main.scss"],
    vite: {
        optimizeDeps: {
            include: ["@vue/devtools-core", "@vue/devtools-kit", "zod"],
        },
    },
    runtimeConfig: {
        sessionPassword: process.env.NUXT_SESSION_PASSWORD,
        databaseUrl: process.env.NUXT_DATABASE_URL,
        vkToken: process.env.NUXT_VK_TOKEN,
        groupOwnerId: process.env.NUXT_GROUP_OWNER_ID,
    },
});
