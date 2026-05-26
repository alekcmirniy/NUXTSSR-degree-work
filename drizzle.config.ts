// drizzle.config.ts
import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { DB_PATH } from "./server/db/dbPath";

export default defineConfig({
    schema: [
        "./server/db/conversationsSchema.ts",
        "./server/db/messagesSchema.ts",
        "./server/db/scheduleSchema.ts",
        "./server/db/usersSchema.ts",
        "./server/db/favoritesSchema.ts",
        "./server/db/vitalsSchema.ts",
    ],
    out: "./drizzle",
    dialect: "sqlite",
    dbCredentials: {
        url: DB_PATH,
    },
});
