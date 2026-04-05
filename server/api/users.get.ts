import { usersTable } from "../db/schema";
import { useDrizzle } from "../utils/drizzle";

export default defineEventHandler(async (event) => {
    const db = useDrizzle();

    const users = db.select().from(usersTable).all();

    return { users };
});
