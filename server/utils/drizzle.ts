import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../db/usersSchema";

const config = useRuntimeConfig();

const db = drizzle(config.databaseUrl, { schema });

export function useDrizzle() {
    return db;
}

export type User = typeof schema.usersTable.$inferSelect;
