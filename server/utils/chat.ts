import { eq } from "drizzle-orm";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { conversationsTable } from "../db/chatsSchema";
export function buildPairKey(a: number, b: number): string {
    return [a, b].sort((x, y) => x - y).join(":");
}

export async function ensureConversation(
    db: BetterSQLite3Database<any>,
    currentUserId: number,
    otherUserId: number,
) {
    const pairKey = buildPairKey(currentUserId, otherUserId);

    let conversation = db
        .select()
        .from(conversationsTable)
        .where(eq(conversationsTable.pairKey, pairKey))
        .get();

    if (!conversation) {
        db.insert(conversationsTable)
            .values({
                pairKey,
                participantAId: currentUserId,
                participantBId: otherUserId,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .run();

        conversation = db
            .select()
            .from(conversationsTable)
            .where(eq(conversationsTable.pairKey, pairKey))
            .get();
    }

    if (!conversation) {
        throw createError({
            statusCode: 500,
            statusMessage: "Не удалось создать диалог",
        });
    }

    return conversation;
}

export function getOtherParticipantId(
    conversation: { participantAId: number; participantBId: number },
    currentUserId: number,
) {
    return conversation.participantAId === currentUserId
        ? conversation.participantBId
        : conversation.participantAId;
}
