declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NUXT_DATABASE_URL: string;
            NUXT_SESSION_PASSWORD: string;
            NUXT_VK_TOKEN: string;
            NUXT_GROUP_OWNER_ID: string;
        }
    }
}

export {};
