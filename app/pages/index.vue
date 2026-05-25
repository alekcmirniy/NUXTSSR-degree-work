<template>
    <div class="w-full bg-slate-950 text-slate-100">
        <main
            class="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 lg:px-8"
        >
            <section
                class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-6 shadow-2xl shadow-black/20 lg:p-8"
            >
                <div
                    class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.24),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.14),transparent_32%)]"
                />
                <div
                    class="relative grid gap-8 lg:grid-cols-[1.35fr_0.85fr] lg:items-center"
                >
                    <div class="space-y-5">
                        <UChip
                            color="primary"
                            variant="soft"
                            size="lg"
                            class="w-fit"
                        >
                            Социальная площадка для сообщества
                        </UChip>

                        <div class="space-y-3">
                            <h1
                                class="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl"
                            >
                                Социальная площадка с лентой, чатами и профилями
                            </h1>
                            <p
                                class="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg"
                            >
                                На этой странице вы можете ознакомиться с
                                актуальными публикациями сообщества.
                            </p>
                        </div>

                        <div class="flex flex-wrap gap-3">
                            <UButton
                                class="ui-btn ui-btn-secondary"
                                to="#feed"
                                size="lg"
                                icon="i-lucide-arrow-down"
                                color="primary"
                                variant="solid"
                            >
                                К ленте
                            </UButton>
                            <UButton
                                class="ui-btn ui-btn-secondary"
                                to="/profile"
                                size="lg"
                                icon="i-lucide-user-round"
                                color="primary"
                                variant="soft"
                            >
                                Профиль
                            </UButton>
                        </div>
                    </div>

                    <div
                        class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1"
                    >
                        <div
                            class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                        >
                            <div
                                class="flex items-center justify-between text-sm text-slate-300"
                            >
                                <span>Лента постов</span>
                                <UIcon
                                    name="i-lucide-layout-list"
                                    class="text-cyan-300"
                                />
                            </div>
                            <div class="mt-3 text-3xl font-semibold text-white">
                                Актуальные публикации
                            </div>
                            <p class="mt-2 text-sm leading-6 text-slate-300">
                                Записи с медиа, реакциями, комментариями и
                                ссылками.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
                <div class="space-y-4" id="feed">
                    <div class="flex items-end justify-between gap-4">
                        <div>
                            <h2 class="text-2xl font-semibold text-white">
                                Лента публикаций
                            </h2>
                        </div>

                        <UButton
                            class="ui-btn ui-btn-secondary"
                            icon="i-lucide-refresh-cw"
                            variant="soft"
                            color="primary"
                            :loading="refreshing"
                            @click="refreshPosts"
                        >
                            Обновить
                        </UButton>
                    </div>

                    <div
                        v-if="initialPending && !normalizedPosts.length"
                        class="grid gap-4"
                    >
                        <div
                            v-for="i in 3"
                            :key="i"
                            class="h-56 animate-pulse rounded-3xl border border-white/10 bg-white/5"
                        />
                    </div>

                    <UAlert
                        v-else-if="combinedError && !normalizedPosts.length"
                        color="error"
                        variant="soft"
                        title="Не удалось загрузить посты"
                        :description="combinedError"
                    />

                    <div
                        v-else-if="!normalizedPosts.length"
                        class="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-center text-slate-300"
                    >
                        Пока нет публикаций для отображения.
                    </div>

                    <template v-else>
                        <div class="grid gap-4">
                            <PostCard
                                v-for="post in normalizedPosts"
                                :key="`${post.ownerId}:${post.id}`"
                                :post-data="post"
                                @favorite-toggle="handleFavoriteToggle"
                            />
                        </div>

                        <div v-if="loadingMore" class="grid gap-4 pt-1">
                            <div
                                v-for="i in 2"
                                :key="i"
                                class="h-56 animate-pulse rounded-3xl border border-white/10 bg-white/5"
                            />
                        </div>

                        <UAlert
                            v-if="combinedError && normalizedPosts.length"
                            class="mt-2"
                            color="warning"
                            variant="soft"
                            title="Часть ленты сейчас недоступна"
                            :description="combinedError"
                        />
                    </template>

                    <div
                        ref="moreSentinel"
                        class="h-1 w-full"
                        aria-hidden="true"
                    />
                </div>

                <aside class="space-y-4">
                    <section
                        class="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10 backdrop-blur-sm"
                    >
                        <h3 class="text-lg font-semibold text-white">
                            Что уже есть на платформе
                        </h3>

                        <div class="mt-4 space-y-3 text-sm text-slate-300">
                            <div
                                class="flex items-start gap-3 rounded-2xl bg-black/20 p-3"
                            >
                                <UIcon
                                    name="i-lucide-newspaper"
                                    class="mt-0.5 size-8 text-cyan-300"
                                />
                                <div>
                                    <div class="font-medium text-white">
                                        Лента и карточки
                                    </div>
                                    <div class="mt-1 leading-6">
                                        Публикации выглядят как полноценная
                                        лента сообщества с медиа, реакциями и
                                        комментариями.
                                    </div>
                                </div>
                            </div>

                            <div
                                class="flex items-start gap-3 rounded-2xl bg-black/20 p-3"
                            >
                                <UIcon
                                    name="i-lucide-message-circle-more"
                                    class="mt-0.5 size-6 text-cyan-300"
                                />
                                <div>
                                    <div class="font-medium text-white">
                                        Чат и обсуждения
                                    </div>
                                    <div class="mt-1 leading-6">
                                        Комментарии, реакции и репосты собраны в
                                        одном месте.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </aside>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import type {
    NormalizedReaction,
    PostData,
    VkGroup,
    VkProfile,
    VkWallItem,
    VkWallResponse,
} from "~/utils/interfaces/posts";

const PAGE_SIZE = 6;

const loadedPosts = ref<VkWallItem[]>([]);
const totalAvailable = ref<number | null>(null);
const profileMap = ref<Record<number, VkProfile>>({});
const groupMap = ref<Record<number, VkGroup>>({});
const loadingMore = ref(false);
const refreshing = ref(false);
const loadError = ref("");
const moreSentinel = ref<HTMLElement | null>(null);

const { refreshFavorites, toggleFavorite, isFavorite } = useFavorites();

type RichTextToken =
    | { type: "text"; value: string }
    | { type: "link"; href: string; label: string }
    | { type: "newline" };

const reactionMetaById: Record<number, { emoji: string; label: string }> = {
    1: { emoji: "👍", label: "Нравится" },
    2: { emoji: "❤️", label: "Супер" },
    3: { emoji: "😂", label: "Смешно" },
    4: { emoji: "😮", label: "Удивило" },
    5: { emoji: "😢", label: "Грустно" },
    6: { emoji: "😡", label: "Злит" },
};
async function handleFavoriteToggle(post: PostData) {
    await toggleFavorite({
        source: "vk",
        ownerId: post.ownerId,
        postId: post.id,
        title: post.headerText,
        text: post.text,
        author: post.author || null,
        authorAvatar: post.authorAvatar || null,
        coverImage: post.photoUrls?.[0] || null,
        postDate: post.date || null,
    });
}
function pickBestPhotoUrl(
    photo?: { sizes?: Array<{ url?: string; width?: number }> } | null,
) {
    const sizes = Array.isArray(photo?.sizes)
        ? photo.sizes.filter((size) => Boolean(size?.url))
        : [];

    if (!sizes.length) {
        return null;
    }

    const best = sizes.reduce((currentBest, candidate) => {
        const currentWidth = Number(currentBest.width ?? 0);
        const candidateWidth = Number(candidate.width ?? 0);
        return candidateWidth > currentWidth ? candidate : currentBest;
    });

    return best.url ?? null;
}

function collectPhotoUrls(attachments: VkWallItem["attachments"] = []) {
    return attachments
        .filter(
            (attachment) => attachment?.type === "photo" && attachment.photo,
        )
        .map((attachment) => pickBestPhotoUrl(attachment.photo))
        .filter((url): url is string => Boolean(url));
}

function normalizeReactions(items: Array<any> = []): NormalizedReaction[] {
    return items
        .map((item) => {
            const count = Number(item?.count ?? 0);

            if (!count) {
                return null;
            }

            const reactionId = Number(item?.reaction_id ?? item?.id ?? 0);
            const meta = reactionMetaById[reactionId];
            const emoji = String(item?.emoji ?? meta?.emoji ?? "✨");
            const label = String(
                item?.label ?? item?.name ?? meta?.label ?? emoji,
            );

            return {
                id: String(item?.reaction_id ?? item?.id ?? label),
                emoji,
                label,
                count,
            };
        })
        .filter(Boolean) as NormalizedReaction[];
}

function normalizeProfileName(profile?: VkProfile | null) {
    if (!profile) {
        return null;
    }

    const fullName =
        `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim();
    return fullName || profile.screen_name || null;
}

function normalizeGroupName(group?: VkGroup | null) {
    if (!group) {
        return null;
    }

    return group.name || group.screen_name || null;
}

function resolveAuthor(fromId: number) {
    if (fromId < 0) {
        const group = groupMap.value[Math.abs(fromId)];

        return {
            name: normalizeGroupName(group) || "Сообщество",
            avatar: group?.photo_100 ?? group?.photo_50 ?? null,
        };
    }

    const profile = profileMap.value[fromId];

    return {
        name: normalizeProfileName(profile),
        avatar: profile?.photo_100 ?? profile?.photo_50 ?? null,
    };
}

function normalizeHref(rawHref: string) {
    const href = rawHref.trim();

    if (/^(https?:\/\/|mailto:)/i.test(href)) {
        return href;
    }

    if (href.startsWith("//")) {
        return `https:${href}`;
    }

    return `https://${href.replace(/^\/+/, "")}`;
}

function parseRichText(source: string): RichTextToken[] {
    const input = source ?? "";
    const tokens: RichTextToken[] = [];
    const pattern = /\[([^\]|]+)\|([^\]]+)\]|(https?:\/\/[^\s<>\]]+)|(\n)/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null = null;

    while ((match = pattern.exec(input)) !== null) {
        if (match.index > lastIndex) {
            tokens.push({
                type: "text",
                value: input.slice(lastIndex, match.index),
            });
        }

        if (match[4]) {
            tokens.push({ type: "newline" });
        } else if (match[1] && match[2]) {
            tokens.push({
                type: "link",
                href: normalizeHref(match[1]),
                label: match[2],
            });
        } else if (match[3]) {
            tokens.push({
                type: "link",
                href: normalizeHref(match[3]),
                label: match[3],
            });
        }

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < input.length) {
        tokens.push({
            type: "text",
            value: input.slice(lastIndex),
        });
    }

    return tokens;
}

function toPlainText(source: string) {
    return parseRichText(source)
        .map((token) => {
            if (token.type === "link") {
                return token.label;
            }

            if (token.type === "newline") {
                return "\n";
            }

            return token.value;
        })
        .join("");
}

function extractHeaderText(source: string) {
    const plain = toPlainText(source).trim();

    if (!plain) {
        return "Публикация сообщества";
    }

    const firstLine = plain.split("\n")[0]?.trim() || "";
    const sentenceMatch = firstLine.match(/^[^.?!]+[.?!]?/u);

    return (sentenceMatch?.[0] ?? firstLine).trim() || "Публикация сообщества";
}

function ingestResponse(payload: VkWallResponse | null, reset = false) {
    const response = payload?.response;

    if (!response) {
        return;
    }

    if (typeof response.count === "number") {
        totalAvailable.value = response.count;
    }

    for (const profile of response.profiles ?? []) {
        profileMap.value[profile.id] = profile;
    }

    for (const group of response.groups ?? []) {
        groupMap.value[group.id] = group;
    }

    const currentPosts = reset ? [] : [...loadedPosts.value];
    const existingIds = new Set(currentPosts.map((post) => post.id));

    for (const item of response.items ?? []) {
        if (!existingIds.has(item.id)) {
            currentPosts.push(item);
            existingIds.add(item.id);
        }
    }

    currentPosts.sort((a, b) => Number(b.date ?? 0) - Number(a.date ?? 0));
    loadedPosts.value = currentPosts;
}

const {
    data: initialResponse,
    pending: initialPending,
    error: initialError,
    refresh: refreshInitial,
} = await useAsyncData<VkWallResponse | null>(
    "vk-feed-initial",
    () =>
        $fetch<VkWallResponse>("/api/vk", {
            query: {
                count: PAGE_SIZE,
                offset: 0,
            },
        }),
    {
        default: () => null,
    },
);

if (initialResponse.value) {
    ingestResponse(initialResponse.value, true);
}

const normalizedPosts = computed<PostData[]>(() =>
    loadedPosts.value.map((post) => {
        const author = resolveAuthor(post.from_id);
        const photoUrls = collectPhotoUrls(post.attachments ?? []);
        const reactions = normalizeReactions(post.reactions?.items ?? []);

        return {
            id: post.id,
            ownerId: post.owner_id,
            headerText: extractHeaderText(post.text ?? ""),
            text: post.text?.trim() ?? "",
            attachments: post.attachments ?? [],
            photoUrls,
            image: photoUrls[0] ?? null,
            date: new Date(Number(post.date) * 1000).toLocaleString("ru-RU", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }),
            author: author.name,
            authorAvatar: author.avatar,
            likes: Number(post.likes?.count ?? 0),
            comments: Number(post.comments?.count ?? 0),
            views: Number(post.views?.count ?? 0),
            reposts: Number(post.reposts?.count ?? 0),
            reactions,
        };
    }),
);

const hasMore = computed(() => {
    if (totalAvailable.value == null) {
        return true;
    }

    return loadedPosts.value.length < totalAvailable.value;
});

const combinedError = computed(() => {
    const initialMessage = initialError.value
        ? String(initialError.value.message || initialError.value)
        : "";

    return loadError.value || initialMessage;
});

async function loadMorePosts() {
    if (loadingMore.value || refreshing.value || !hasMore.value) {
        return;
    }

    loadingMore.value = true;
    loadError.value = "";

    try {
        const response = await $fetch<VkWallResponse>("/api/vk", {
            query: {
                count: PAGE_SIZE,
                offset: loadedPosts.value.length,
            },
        });

        ingestResponse(response, false);
    } catch (error) {
        loadError.value =
            error instanceof Error
                ? error.message
                : "Не удалось подгрузить публикации";
    } finally {
        loadingMore.value = false;
    }
}

async function refreshPosts() {
    if (refreshing.value) {
        return;
    }

    refreshing.value = true;
    loadError.value = "";

    try {
        loadedPosts.value = [];
        totalAvailable.value = null;
        profileMap.value = {};
        groupMap.value = {};

        await refreshInitial();

        if (initialResponse.value) {
            ingestResponse(initialResponse.value, true);
        }
    } catch (error) {
        loadError.value =
            error instanceof Error
                ? error.message
                : "Не удалось обновить ленту";
    } finally {
        refreshing.value = false;
    }
}

let observer: IntersectionObserver | null = null;

onMounted(async () => {
    await refreshFavorites();

    if (typeof window === "undefined") {
        return;
    }

    observer = new IntersectionObserver(
        (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                void loadMorePosts();
            }
        },
        {
            rootMargin: "900px 0px 900px 0px",
            threshold: 0.01,
        },
    );

    await nextTick();

    if (moreSentinel.value) {
        observer.observe(moreSentinel.value);
    }
});

watch(moreSentinel, (current, previous) => {
    if (!observer) {
        return;
    }

    if (previous) {
        observer.unobserve(previous);
    }

    if (current) {
        observer.observe(current);
    }
});

onBeforeUnmount(() => {
    observer?.disconnect();
    observer = null;
});
</script>
