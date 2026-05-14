import { and, eq, isNull, ne } from "drizzle-orm";
import { conversationsTable, messagesTable } from "~~/server/db/chatsSchema";

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

    const db = useDrizzle();
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

    db.update(messagesTable)
        .set({ readAt: now })
        .where(
            and(
                eq(messagesTable.conversationId, conversationId),
                ne(messagesTable.senderId, currentUserId),
                isNull(messagesTable.readAt),
            ),
        )
        .run();

    return { ok: true };
});
