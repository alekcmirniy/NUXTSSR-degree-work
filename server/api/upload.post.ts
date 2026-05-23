import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event);

    if (!formData) {
        throw createError({
            statusCode: 400,
            statusMessage: "No file",
        });
    }

    const file = formData.find((item) => item.name === "file");

    if (!file || !file.data) {
        throw createError({
            statusCode: 400,
            statusMessage: "File not found",
        });
    }

    const fileName = `${randomUUID()}.png`;

    const uploadPath = path.join(process.cwd(), "public", "uploads", fileName);

    await writeFile(uploadPath, file.data);

    return {
        url: `/uploads/${fileName}`,
    };
});
