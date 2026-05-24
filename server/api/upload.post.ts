import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event);

    if (!formData) {
        throw createError({
            statusCode: 400,
            statusMessage: "Файл не найден",
        });
    }

    const file = formData.find((item) => item.name === "file");

    if (!file?.data) {
        throw createError({
            statusCode: 400,
            statusMessage: "Некорректный файл",
        });
    }

    const extension = path.extname(file.filename || "").toLowerCase() || ".png";

    const fileName = `${randomUUID()}${extension}`;

    const uploadPath = path.join(process.cwd(), "public", "uploads", fileName);

    await writeFile(uploadPath, file.data);

    return {
        url: `/uploads/${fileName}`,
    };
});
