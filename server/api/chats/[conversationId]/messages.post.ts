import { eq } from "drizzle-orm";
import { z } from "zod";
import { messagesTable } from "~~/server/db/messagesSchema";
import { conversationsTable } from "~~/server/db/conversationsSchema";
import { db } from "~~/server/db/index";

const schema = z.object({
    content: z
        .string()
        .trim()
        .min(1, "Сообщение не может быть пустым")
        .max(4000),
});

export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);
    const currentUserId = Number((user as any).id);
    const conversationId = Number(getRouterParam(event, "conversationId"));

    if (!Number.isFinite(currentUserId) || !Number.isFinite(conversationId)) {
        throw createError({
            statusCode: 400,
            statusMessage: "Некорректные параметры",
        });
    }

    const body = await readBody(event);
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
        throw createError({
            statusCode: 400,
            statusMessage:
                parsed.error.issues[0]?.message || "Некорректное сообщение",
        });
    }

    const conversation = db
        .select()
        .from(conversationsTable)
        .where(eq(conversationsTable.id, conversationId))
        .get();

    if (!conversation) {
        throw createError({
            statusCode: 404,
            statusMessage: "Диалог не найден",
        });
    }

    const isParticipant =
        conversation.participantAId === currentUserId ||
        conversation.participantBId === currentUserId;

    if (!isParticipant) {
        throw createError({
            statusCode: 403,
            statusMessage: "Нет доступа к диалогу",
        });
    }

    const now = new Date();

    db.insert(messagesTable)
        .values({
            conversationId,
            senderId: currentUserId,
            content: parsed.data.content,
            createdAt: now,
            readAt: null,
        })
        .run();

    db.update(conversationsTable)
        .set({ updatedAt: now })
        .where(eq(conversationsTable.id, conversationId))
        .run();

    return { ok: true };
});
