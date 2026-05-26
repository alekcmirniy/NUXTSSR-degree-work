// server/db/index.ts
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import { DB_PATH } from "./dbPath";

const sqlite = new Database(DB_PATH, { fileMustExist: true });
export const db = drizzle(sqlite, { schema });
