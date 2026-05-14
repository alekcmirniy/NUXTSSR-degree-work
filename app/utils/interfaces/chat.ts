import type { UserPreview } from "./users";

export interface ChatMessage {
    id: number;
    conversationId: number;
    senderId: number;
    content: string;
    createdAt: string;
    readAt: string | null;
}

export interface ConversationPreview {
    id: number;
    pairKey: string;
    updatedAt: string;
    otherUser: UserPreview;
    lastMessage: ChatMessage | null;
    unreadCount: number;
}

export interface ChatThreadResponse {
    conversation: {
        id: number;
        pairKey: string;
        updatedAt: string;
        createdAt: string;
    };
    counterpart: UserPreview;
    messages: ChatMessage[];
}
