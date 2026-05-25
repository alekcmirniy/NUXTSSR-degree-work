import tailwindcss from "@tailwindcss/vite";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",

    devtools: {
        enabled: true,
    },

    ssr: true,

    app: {
        head: {
            link: [
                {
                    rel: "icon",
                    type: "image/png",
                    href: "/logo.png",
                },
            ],
        },
    },

    modules: ["@pinia/nuxt", "@nuxt/fonts", "nuxt-auth-utils", "@nuxt/ui"],

    css: ["~/assets/css/main.css"],

    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            include: [
                "@vue/devtools-core",
                "@vue/devtools-kit",
                "web-vitals/attribution",
            ],
        },
    },

    components: {
        dirs: [
            "~/components/atoms",
            "~/components/molecules",
            "~/components/organisms",
        ],
    },

    typescript: {
        strict: true,
        shim: true,
        typeCheck: false,
    },

    runtimeConfig: {
        sessionPassword: process.env.NUXT_SESSION_PASSWORD,
        databaseUrl: process.env.NUXT_DATABASE_URL,
        vkToken: process.env.NUXT_VK_TOKEN,
        groupOwnerId: process.env.NUXT_GROUP_OWNER_ID,
    },
});
