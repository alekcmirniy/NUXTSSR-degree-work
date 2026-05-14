import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    schema: [
        "./server/db/usersSchema.ts",
        "./server/db/chatsSchema.ts",
        "./server/db/scheduleSchema.ts",
    ],
    dialect: "sqlite",
    dbCredentials: { url: process.env.DATABASE_URL! },
});
