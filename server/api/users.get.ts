import { usersTable } from "~~/server/db/usersSchema";
import { useDrizzle } from "../utils/drizzle";

export default defineEventHandler(async (event) => {
    const db = useDrizzle();

    const users = db.select().from(usersTable).all();

    return { users };
});
