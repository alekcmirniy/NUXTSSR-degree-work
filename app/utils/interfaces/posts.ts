export type VkPhotoSize = {
    url: string;
    width?: number;
    height?: number;
    type?: string;
};

export type VkPhoto = {
    sizes?: VkPhotoSize[];
};

export type VkAttachment = {
    type: string;
    photo?: VkPhoto;
    [key: string]: unknown;
};

export type VkProfile = {
    id: number;
    first_name?: string;
    last_name?: string;
    screen_name?: string;
    photo_50?: string;
    photo_100?: string;
};

export type VkGroup = {
    id: number;
    name?: string;
    screen_name?: string;
    photo_50?: string;
    photo_100?: string;
};

export type VkReactionItem = {
    id?: number;
    reaction_id?: number;
    count?: number;
    emoji?: string;
    name?: string;
    label?: string;
};

export type VkWallItem = {
    attachments?: VkAttachment[];
    comments: { count: number };
    date: number;
    from_id: number;
    id: number;
    likes: { can_like?: number; count: number; user_likes?: number };
    marked_as_ads: number;
    owner_id: number;
    reaction_set_id?: string;
    reactions?: { count: number; items?: VkReactionItem[] };
    reposts: { count: number };
    text: string;
    type: string;
    views: { count: number };
};

export type VkWallResponse = {
    response: {
        count: number;
        items: VkWallItem[];
        profiles?: VkProfile[];
        groups?: VkGroup[];
        reaction_sets?: unknown[];
    };
};

export type VkCommentItem = {
    id: number;
    date: number;
    from_id: number;
    text: string;
    likes?: { count: number };
    attachments?: VkAttachment[];
};

export type VkCommentsResponse = {
    response: {
        count: number;
        items: VkCommentItem[];
        profiles?: VkProfile[];
        groups?: VkGroup[];
    };
};

export interface NormalizedReaction {
    id: string;
    emoji: string;
    label: string;
    count: number;
}

export interface NormalizedComment {
    id: number;
    author: string | null;
    avatar: string | null;
    date: string;
    text: string;
}

export interface PostData {
    id: number;
    ownerId: number;
    headerText: string;
    text: string;
    attachments: VkAttachment[];
    photoUrls: string[];
    image: string | null;
    date: string;
    author: string | null;
    authorAvatar: string | null;
    likes: number;
    comments: number;
    views: number;
    reposts: number;
    reactions: NormalizedReaction[];
}
