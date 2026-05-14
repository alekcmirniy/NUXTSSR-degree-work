import { desc, eq, or, and } from "drizzle-orm";
import { conversationsTable, messagesTable } from "~~/server/db/chatsSchema";
import { usersTable } from "~~/server/db/usersSchema";
import type { ConversationPreview } from "~/utils/interfaces/chat";

export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event);
    const currentUserId = Number((user as any).id);

    if (!Number.isFinite(currentUserId)) {
        throw createError({
            statusCode: 401,
            statusMessage: "Сессия не содержит пользователя",
        });
    }

    const db = useDrizzle();

    const conversations = db
        .select()
        .from(conversationsTable)
        .where(
            or(
                eq(conversationsTable.participantAId, currentUserId),
                eq(conversationsTable.participantBId, currentUserId),
            ),
        )
        .orderBy(desc(conversationsTable.updatedAt))
        .all();

    const result: ConversationPreview[] = [];

    for (const conversation of conversations) {
        const otherUserId =
            conversation.participantAId === currentUserId
                ? conversation.participantBId
                : conversation.participantAId;

        const otherUser = db
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

        if (!otherUser) continue;

        const lastMessage = db
            .select()
            .from(messagesTable)
            .where(eq(messagesTable.conversationId, conversation.id))
            .orderBy(desc(messagesTable.createdAt))
            .get();

        const unreadCount = db
            .select()
            .from(messagesTable)
            .where(
                and(
                    eq(messagesTable.conversationId, conversation.id),
                    eq(messagesTable.senderId, otherUserId),
                ),
            )
            .all()
            .filter((message) => message.readAt === null).length;

        result.push({
            id: conversation.id,
            pairKey: conversation.pairKey,
            updatedAt: new Date(conversation.updatedAt).toISOString(),
            otherUser,
            lastMessage: lastMessage
                ? {
                      id: lastMessage.id,
                      conversationId: lastMessage.conversationId,
                      senderId: lastMessage.senderId,
                      content: lastMessage.content,
                      createdAt: new Date(lastMessage.createdAt).toISOString(),
                      readAt: lastMessage.readAt
                          ? new Date(lastMessage.readAt).toISOString()
                          : null,
                  }
                : null,
            unreadCount,
        });
    }

    return result;
});
