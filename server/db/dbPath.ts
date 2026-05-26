// server/db/dbPath.ts
import { resolve } from "node:path";

export const DB_PATH = process.env.NUXT_DATABASE_URL
    ? process.env.NUXT_DATABASE_URL
    : resolve(process.cwd(), "data", "db.sqlite");
