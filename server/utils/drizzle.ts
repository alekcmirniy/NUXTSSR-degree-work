import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../db/usersSchema";

const db = drizzle(process.env.DATABASE_URL!, { schema });

export function useDrizzle() {
    return db;
}

export type User = typeof schema.usersTable.$inferSelect;
