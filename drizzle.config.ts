import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: [
        "./server/db/conversationsSchema.ts",
        "./server/db/messagesSchema.ts",
        "./server/db/scheduleSchema.ts",
        "./server/db/usersSchema.ts",
        "./server/db/favoritesSchema.ts",
    ],
    out: "./drizzle",
    dialect: "sqlite",
    dbCredentials: {
        url: "./db.sqlite",
    },
});
