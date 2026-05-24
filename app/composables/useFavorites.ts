export type FavoritePost = {
    id: number;
    userId: number;
    source: string;
    ownerId: number;
    postId: number;
    title: string;
    text?: string | null;
    author?: string | null;
    authorAvatar?: string | null;
    coverImage?: string | null;
    postDate?: string | null;
    createdAt: string;
};

export type FavoritePostInput = {
    source?: string;
    ownerId: number;
    postId: number;
    title: string;
    text?: string | null;
    author?: string | null;
    authorAvatar?: string | null;
    coverImage?: string | null;
    postDate?: string | null;
};

function favoriteKey(source: string, ownerId: number, postId: number) {
    return `${source}:${ownerId}:${postId}`;
}

export function useFavorites() {
    const favorites = useState<FavoritePost[]>("favorites", () => []);
    const loading = useState<boolean>("favorites-loading", () => false);

    const favoriteSet = computed(() => {
        return new Set(
            favorites.value.map((item) =>
                favoriteKey(item.source, item.ownerId, item.postId),
            ),
        );
    });

    function isFavorite(
        input: Pick<FavoritePostInput, "source" | "ownerId" | "postId">,
    ) {
        const source = input.source || "vk";
        return favoriteSet.value.has(
            favoriteKey(source, input.ownerId, input.postId),
        );
    }

    async function refreshFavorites() {
        loading.value = true;

        try {
            favorites.value = await $fetch<FavoritePost[]>("/api/favorites");
        } finally {
            loading.value = false;
        }
    }

    async function toggleFavorite(input: FavoritePostInput) {
        const payload = {
            source: input.source || "vk",
            ownerId: input.ownerId,
            postId: input.postId,
            title: input.title,
            text: input.text ?? null,
            author: input.author ?? null,
            authorAvatar: input.authorAvatar ?? null,
            coverImage: input.coverImage ?? null,
            postDate: input.postDate ?? null,
        };

        const response = await $fetch<{
            action: "added" | "removed";
            id: number;
        }>("/api/favorites/toggle", {
            method: "POST",
            body: payload,
        });

        const key = favoriteKey(
            payload.source,
            payload.ownerId,
            payload.postId,
        );

        if (response.action === "added") {
            const now = new Date().toISOString();

            favorites.value = [
                {
                    id: response.id,
                    userId: 0,
                    source: payload.source,
                    ownerId: payload.ownerId,
                    postId: payload.postId,
                    title: payload.title,
                    text: payload.text,
                    author: payload.author,
                    authorAvatar: payload.authorAvatar,
                    coverImage: payload.coverImage,
                    postDate: payload.postDate,
                    createdAt: now,
                },
                ...favorites.value.filter(
                    (item) =>
                        favoriteKey(item.source, item.ownerId, item.postId) !==
                        key,
                ),
            ];
        } else {
            favorites.value = favorites.value.filter(
                (item) =>
                    favoriteKey(item.source, item.ownerId, item.postId) !== key,
            );
        }
    }

    return {
        favorites,
        loading,
        refreshFavorites,
        toggleFavorite,
        isFavorite,
    };
}
