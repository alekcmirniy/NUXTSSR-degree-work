declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            SESSION_PASSWORD: string;
            VK_TOKEN: string;
            GROUP_OWNER_ID: string;
        }
    }
}

export {};
