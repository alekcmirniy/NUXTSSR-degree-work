import { eq, desc } from "drizzle-orm";
import { messagesTable } from "~~/server/db/messagesSchema";
import { usersTable } from "~~/server/db/usersSchema";
import { ensureConversation } from "~~/server/utils/chat";
import type { ChatThreadResponse } from "~/utils/interfaces/chat";
import { db } from "~~/server/db/index";

export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);
    const currentUserId = Number((user as any).id);
    const otherUserId = Number(getRouterParam(event, "userId"));

    if (!Number.isFinite(currentUserId) || !Number.isFinite(otherUserId)) {
        throw createError({
            statusCode: 400,
            statusMessage: "Некорректные параметры",
        });
    }

    if (currentUserId === otherUserId) {
        throw createError({
            statusCode: 400,
            statusMessage: "Нельзя открыть диалог с самим собой",
        });
    }

    const counterpart = db
        .select({
            id: usersTable.id,
            name: usersTable.name,
            surname: usersTable.surname,
            patronymic: usersTable.patronymic,
            role: usersTable.role,
            group: usersTable.group,
            department: usersTable.department,
            bio: usersTable.bio,
            avatarUrl: usersTable.avatarUrl,
        })
        .from(usersTable)
        .where(eq(usersTable.id, otherUserId))
        .get();

    if (!counterpart) {
        throw createError({
            statusCode: 404,
            statusMessage: "Пользователь не найден",
        });
    }

    const conversation = await ensureConversation(
        db,
        currentUserId,
        otherUserId,
    );

    const messages = db
        .select()
        .from(messagesTable)
        .where(eq(messagesTable.conversationId, conversation.id))
        .orderBy(desc(messagesTable.createdAt))
        .all()
        .reverse()
        .map((message) => ({
            id: message.id,
            conversationId: message.conversationId,
            senderId: message.senderId,
            content: message.content,
            createdAt: new Date(message.createdAt).toISOString(),
            readAt: message.readAt
                ? new Date(message.readAt).toISOString()
                : null,
        }));

    const payload: ChatThreadResponse = {
        conversation: {
            id: conversation.id,
            pairKey: conversation.pairKey,
            updatedAt: new Date(conversation.updatedAt).toISOString(),
            createdAt: new Date(conversation.createdAt).toISOString(),
        },
        counterpart,
        messages,
    };

    return payload;
});
