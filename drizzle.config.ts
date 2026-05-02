import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    schema: ["./server/db/usersSchema.ts", "./server/db/messagesSchema.ts"],
    dialect: "sqlite",
    dbCredentials: { url: process.env.DATABASE_URL! },
});
