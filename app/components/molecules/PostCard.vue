<template>
    <article
        class="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/10 backdrop-blur"
    >
        <div class="border-b border-white/10 p-5">
            <div class="flex items-start gap-3">
                <div
                    v-if="postData.authorAvatar"
                    class="h-11 w-11 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/10"
                >
                    <img
                        :src="postData.authorAvatar"
                        :alt="postData.author || 'Автор поста'"
                        class="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                <div class="min-w-0 flex-1 space-y-1">
                    <h3 class="text-lg font-semibold text-white">
                        {{ postData.headerText }}
                    </h3>

                    <p v-if="postData.author" class="text-sm text-slate-400">
                        {{ postData.author }} · {{ postData.date }}
                    </p>
                    <p v-else class="text-sm text-slate-400">
                        {{ postData.date }}
                    </p>
                </div>
            </div>
        </div>

        <div
            v-if="postData.photoUrls.length"
            class="border-b border-white/10 bg-black/20 p-4"
        >
            <div
                :class="
                    postData.photoUrls.length > 1
                        ? 'flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory'
                        : 'grid'
                "
            >
                <figure
                    v-for="(src, index) in postData.photoUrls"
                    :key="`${postData.id}-${index}`"
                    :class="
                        postData.photoUrls.length > 1
                            ? 'min-w-[82%] flex-none snap-start overflow-hidden rounded-2xl sm:min-w-[68%] lg:min-w-[58%]'
                            : 'overflow-hidden rounded-2xl'
                    "
                >
                    <img
                        :src="src"
                        :alt="`${postData.headerText} — фото ${index + 1}`"
                        class="h-72 w-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                </figure>
            </div>
        </div>

        <div class="p-5">
            <p class="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                <template
                    v-for="(segment, index) in textTokens"
                    :key="`${segment.type}-${index}`"
                >
                    <span v-if="segment.type === 'text'">{{
                        segment.value
                    }}</span>
                    <br v-else-if="segment.type === 'newline'" />
                    <a
                        v-else
                        :href="segment.href"
                        target="_blank"
                        rel="noreferrer noopener"
                        class="text-cyan-300 underline decoration-white/20 underline-offset-4 transition hover:text-cyan-200"
                    >
                        {{ segment.label }}
                    </a>
                </template>
            </p>
        </div>

        <div class="border-t border-white/10 p-5">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <div class="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-slate-100 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                        :aria-expanded="commentsOpen"
                        @click="toggleComments"
                    >
                        <UIcon name="i-lucide-message-circle-more" />
                        <span>Комментарии</span>
                        <span class="text-slate-300">{{
                            postData.comments
                        }}</span>
                    </button>

                    <div
                        class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-slate-100"
                    >
                        <UIcon name="i-lucide-repeat-2" />
                        <span>{{ postData.reposts }}</span>
                    </div>

                    <div
                        class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-medium text-slate-100"
                    >
                        <UIcon name="i-lucide-heart" />
                        <span>{{ postData.likes }}</span>
                    </div>

                    <div
                        class="inline-flex items-center gap-2 text-xs text-slate-400"
                    >
                        <UIcon name="i-lucide-eye" />
                        <span>{{ postData.views }}</span>
                    </div>
                </div>

                <div
                    v-if="postData.reactions.length"
                    class="flex flex-wrap gap-2"
                >
                    <span
                        v-for="reaction in postData.reactions"
                        :key="reaction.id"
                        class="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-2 text-xs text-slate-200"
                    >
                        <span>{{ reaction.emoji }}</span>
                        <span>{{ reaction.count }}</span>
                    </span>
                </div>
            </div>

            <div v-if="commentsOpen" class="mt-5 border-t border-white/10 pt-4">
                <div v-if="commentsLoading" class="space-y-3">
                    <div
                        v-for="i in 2"
                        :key="i"
                        class="h-16 animate-pulse rounded-2xl bg-white/5"
                    />
                </div>

                <div
                    v-else-if="commentsError"
                    class="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-100"
                >
                    {{ commentsError }}
                </div>

                <div
                    v-else-if="!comments.length"
                    class="rounded-2xl bg-black/20 p-4 text-sm text-slate-400"
                >
                    Комментариев пока нет.
                </div>

                <div v-else class="space-y-3">
                    <article
                        v-for="comment in comments"
                        :key="comment.id"
                        class="rounded-2xl bg-black/20 p-4"
                    >
                        <div class="flex items-start gap-3">
                            <div
                                class="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/10 text-xs font-semibold text-white"
                            >
                                <img
                                    v-if="comment.avatar"
                                    :src="comment.avatar"
                                    :alt="comment.author || 'Комментарий'"
                                    class="h-full w-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <span v-else>{{
                                    getInitials(comment.author)
                                }}</span>
                            </div>

                            <div class="min-w-0 flex-1">
                                <div
                                    class="flex flex-wrap items-center gap-2 text-sm"
                                >
                                    <span class="font-medium text-white">
                                        {{ comment.author || "Автор" }}
                                    </span>
                                    <span class="text-slate-500"
                                        >· {{ comment.date }}</span
                                    >
                                </div>

                                <p
                                    class="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300"
                                >
                                    <template
                                        v-for="(
                                            segment, index
                                        ) in parseRichText(comment.text)"
                                        :key="`${comment.id}-${segment.type}-${index}`"
                                    >
                                        <span v-if="segment.type === 'text'">{{
                                            segment.value
                                        }}</span>
                                        <br
                                            v-else-if="
                                                segment.type === 'newline'
                                            "
                                        />
                                        <a
                                            v-else
                                            :href="segment.href"
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            class="text-cyan-300 underline decoration-white/20 underline-offset-4 transition hover:text-cyan-200"
                                        >
                                            {{ segment.label }}
                                        </a>
                                    </template>
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import type {
    NormalizedComment,
    PostData,
    VkCommentsResponse,
    VkGroup,
    VkProfile,
} from "~/utils/interfaces/posts";

type RichTextToken =
    | { type: "text"; value: string }
    | { type: "link"; href: string; label: string }
    | { type: "newline" };

const props = defineProps<{
    postData: PostData;
}>();

const commentsOpen = ref(false);
const commentsLoaded = ref(false);
const commentsLoading = ref(false);
const commentsError = ref("");
const comments = ref<NormalizedComment[]>([]);
const profileMap = ref<Record<number, VkProfile>>({});
const groupMap = ref<Record<number, VkGroup>>({});

const textTokens = computed(() => parseRichText(props.postData.text ?? ""));

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
        name: normalizeProfileName(profile) || "Автор",
        avatar: profile?.photo_100 ?? profile?.photo_50 ?? null,
    };
}

function getInitials(name: string | null | undefined) {
    const label = (name || "Автор").trim();
    const parts = label.split(/\s+/).filter(Boolean);

    if (!parts.length) {
        return "A";
    }

    return parts
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");
}

function ingestComments(payload: VkCommentsResponse | null) {
    const response = payload?.response;

    if (!response) {
        comments.value = [];
        commentsLoaded.value = true;
        return;
    }

    for (const profile of response.profiles ?? []) {
        profileMap.value[profile.id] = profile;
    }

    for (const group of response.groups ?? []) {
        groupMap.value[group.id] = group;
    }

    comments.value = (response.items ?? [])
        .filter((item) => {
            const text = item.text?.trim();

            return Boolean(text);
        })
        .map((item) => {
            const author = resolveAuthor(item.from_id);

            return {
                id: item.id,
                author: author.name,
                avatar: author.avatar,
                date: new Date(Number(item.date) * 1000).toLocaleString(
                    "ru-RU",
                    {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    },
                ),
                text: item.text?.trim() ?? "",
            };
        });

    commentsLoaded.value = true;
}

async function loadComments() {
    if (commentsLoaded.value || commentsLoading.value) {
        return;
    }

    commentsLoading.value = true;
    commentsError.value = "";

    try {
        const response = await $fetch<VkCommentsResponse>("/api/vk/comments", {
            query: {
                owner_id: props.postData.ownerId,
                post_id: props.postData.id,
                count: 10,
                offset: 0,
            },
        });

        ingestComments(response);
    } catch (error) {
        commentsError.value =
            error instanceof Error
                ? error.message
                : "Не удалось загрузить комментарии";
        commentsLoaded.value = false;
    } finally {
        commentsLoading.value = false;
    }
}

async function toggleComments() {
    commentsOpen.value = !commentsOpen.value;

    if (commentsOpen.value && !commentsLoaded.value) {
        await loadComments();
    }
}
</script>
