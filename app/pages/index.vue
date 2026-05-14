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
                            Рады вас видеть на тематической платформе для
                            сообщества!
                        </UChip>

                        <div class="space-y-3">
                            <h1
                                class="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl"
                            >
                                Пространство для людей, идей и актуальных
                                публикаций
                            </h1>
                            <p
                                class="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg"
                            >
                                Главная страница собирает свежие посты из API и
                                сразу показывает живую ленту без лишних
                                переходов.
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
                        class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
                    >
                        <div
                            class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                        >
                            <div
                                class="flex items-center justify-between text-sm text-slate-300"
                            >
                                <span>SSR</span>
                                <UIcon
                                    name="i-lucide-server"
                                    class="text-cyan-300"
                                />
                            </div>
                            <div class="mt-3 text-3xl font-semibold text-white">
                                Быстрый первый рендер
                            </div>
                            <p class="mt-2 text-sm leading-6 text-slate-300">
                                Страница отрисовывается сразу на сервере и
                                выглядит готовой без лишнего ожидания.
                            </p>
                        </div>

                        <div
                            class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                        >
                            <div
                                class="flex items-center justify-between text-sm text-slate-300"
                            >
                                <span>Платформа</span>
                                <UIcon
                                    name="i-lucide-compass"
                                    class="text-indigo-300"
                                />
                            </div>
                            <div class="mt-3 text-sm leading-6 text-slate-300">
                                В шапке уже живут основные разделы: главная,
                                профиль, расписание, чат и о нас.
                            </div>
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
                            <p class="mt-1 text-sm text-slate-400">
                                Последние записи из API VK с аккуратной
                                карточной подачей.
                            </p>
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

                    <div v-if="pending && !posts.length" class="grid gap-4">
                        <div
                            v-for="i in 3"
                            :key="i"
                            class="h-56 animate-pulse rounded-3xl border border-white/10 bg-white/5"
                        />
                    </div>

                    <UAlert
                        v-else-if="error"
                        color="error"
                        variant="soft"
                        title="Не удалось загрузить посты"
                        :description="String(error.message || error)"
                    />

                    <div
                        v-else-if="!posts.length"
                        class="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-center text-slate-300"
                    >
                        Пока нет публикаций для отображения.
                    </div>

                    <div v-else class="grid gap-4">
                        <PostCard
                            v-for="post in normalizedPosts"
                            :key="`${post.id}`"
                            :post-data="post"
                        />
                    </div>
                </div>

                <aside class="space-y-4">
                    <section
                        class="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10 backdrop-blur"
                    >
                        <h3 class="text-lg font-semibold text-white">
                            Что есть на платформе
                        </h3>
                        <div class="mt-4 space-y-3 text-sm text-slate-300">
                            <div
                                class="flex items-start gap-3 rounded-2xl bg-black/20 p-3"
                            >
                                <UIcon
                                    name="i-lucide-badge-info"
                                    class="mt-0.5 text-cyan-300"
                                />
                                <div>
                                    <div class="font-medium text-white">
                                        Тематическая главная
                                    </div>
                                    <div class="mt-1 leading-6">
                                        Показывает публикации, контекст и
                                        быстрые переходы к разделам.
                                    </div>
                                </div>
                            </div>
                            <div
                                class="flex items-start gap-3 rounded-2xl bg-black/20 p-3"
                            >
                                <UIcon
                                    name="i-lucide-clock-3"
                                    class="mt-0.5 text-indigo-300"
                                />
                                <div>
                                    <div class="font-medium text-white">
                                        Расписание и события
                                    </div>
                                    <div class="mt-1 leading-6">
                                        Здесь удобно потом добавить анонсы
                                        встреч и активности по дням.
                                    </div>
                                </div>
                            </div>
                            <div
                                class="flex items-start gap-3 rounded-2xl bg-black/20 p-3"
                            >
                                <UIcon
                                    name="i-lucide-message-circle"
                                    class="mt-0.5 text-fuchsia-300"
                                />
                                <div>
                                    <div class="font-medium text-white">
                                        Чат и люди
                                    </div>
                                    <div class="mt-1 leading-6">
                                        Социальный слой платформы будет
                                        дополнять ленту, а не спорить с ней.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        class="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/5 p-5 shadow-lg shadow-black/10"
                    >
                        <h3 class="text-lg font-semibold text-white">
                            Сейчас в фокусе
                        </h3>
                        <div class="mt-4 grid gap-3 text-sm text-slate-300">
                            <div class="rounded-2xl bg-black/20 p-4">
                                <div class="text-white">Посты из API</div>
                                <div class="mt-1 leading-6">
                                    Нормализация данных уже готова под карточки
                                    и дальнейшую работу с медиа.
                                </div>
                            </div>
                            <div class="rounded-2xl bg-black/20 p-4">
                                <div class="text-white">Современный вид</div>
                                <div class="mt-1 leading-6">
                                    Тёмная тема, мягкие градиенты и чистые сетки
                                    под SSR-платформу.
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
import type { PostData, PostsRequest } from "~/utils/interfaces/posts";

const axiosStore = useAxiosStore();
const { setData } = axiosStore;
const { posts } = storeToRefs(axiosStore);

const refreshing = ref(false);
const hasPosts = computed(
    () => Array.isArray(posts.value) && posts.value.length > 0,
);

const { $fetchInstanse } = useNuxtApp();

const { error, pending, execute } = await useFetch("/api/vk", {
    method: "GET",
    immediate: false,
    $fetch: $fetchInstanse,
    onResponse: ({ response }) => {
        const apiPosts = response._data?.response?.items as
            | PostsRequest["items"]
            | undefined;

        if (Array.isArray(apiPosts)) {
            setData("posts", apiPosts);
        }
    },
    onResponseError: ({ error }) => {
        console.error(error);
    },
});

if (!hasPosts.value) {
    await execute();
}

const normalizedPosts = computed<Array<PostData>>(() => {
    const source = Array.isArray(posts.value) ? posts.value : [];

    return source.map((post) => {
        const attachmentPhoto = post.attachments?.find(
            (item: any) => item?.type === "photo",
        );

        const photo = attachmentPhoto?.photo;
        const sizes = Array.isArray(photo?.sizes) ? photo.sizes : [];

        const image =
            sizes.find((size: any) => size?.width >= 800)?.url ??
            sizes[sizes.length - 1]?.url ??
            null;

        const rawText = (post.text || "").trim();

        let headerText = "Публикация сообщества";

        if (rawText) {
            const firstLine = rawText.split("\n")[0] || "";

            const sentenceMatch = firstLine.match(/^[^.?!]+[.?!]?/);

            headerText = sentenceMatch
                ? sentenceMatch[0].trim()
                : firstLine.trim();
        }

        return {
            id: post.id,

            headerText,
            text: rawText,

            author: post.from_id
                ? `Автор ${Math.abs(post.from_id)}`
                : "Сообщество",

            date: new Date(Number(post.date) * 1000).toLocaleString("ru-RU", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }),

            image,
            attachments: post.attachments,

            likes: post.likes.count,
            comments: post.comments.count,
            views: post.views.count,
            reposts: post.reposts.count,
        };
    });
});

const refreshPosts = async () => {
    if (pending.value || refreshing.value) return;

    refreshing.value = true;
    try {
        await execute();
    } finally {
        refreshing.value = false;
    }
};
</script>
