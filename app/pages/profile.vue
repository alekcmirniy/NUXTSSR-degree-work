<template>
    <div class="w-full px-4 py-6 lg:px-8">
        <div class="mx-auto w-full max-w-7xl">
            <template v-if="loggedIn">
                <section
                    class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 shadow-2xl shadow-black/20"
                >
                    <div
                        class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.22),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.14),transparent_32%)]"
                    />

                    <div
                        class="relative flex flex-col gap-6 p-6 lg:p-8 xl:flex-row xl:items-end xl:justify-between"
                    >
                        <div
                            class="flex flex-col gap-5 sm:flex-row sm:items-center"
                        >
                            <div class="relative h-28 w-28 shrink-0">
                                <div
                                    class="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/10 text-3xl font-semibold text-white shadow-lg"
                                >
                                    <img
                                        v-if="profilePhoto"
                                        :src="profilePhoto"
                                    />
                                    <span v-else>{{ userInitials }}</span>
                                </div>

                                <label
                                    class="absolute -bottom-2 left-1/2 flex -translate-x-1/2 cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-slate-950/90 px-3 py-1.5 text-xs text-slate-200 shadow-lg backdrop-blur transition hover:bg-white/10"
                                >
                                    <UIcon
                                        name="i-lucide-camera"
                                        class="text-cyan-300"
                                    />
                                    Фото
                                    <input
                                        ref="fileInput"
                                        type="file"
                                        accept="image/*"
                                        class="hidden"
                                        @change="onPhotoChange"
                                    />
                                </label>
                            </div>

                            <div class="space-y-3">
                                <div class="space-y-1">
                                    <UChip
                                        color="primary"
                                        variant="soft"
                                        size="lg"
                                        class="w-fit"
                                    >
                                        Онлайн-профиль
                                    </UChip>

                                    <h1
                                        class="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                                    >
                                        {{ displayName }}
                                    </h1>

                                    <p
                                        class="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base"
                                    >
                                        {{ profileHeadline }}
                                    </p>
                                </div>

                                <div class="flex flex-wrap gap-2">
                                    <span
                                        class="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200"
                                    >
                                        {{ profileStatus }}
                                    </span>
                                    <span
                                        class="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200"
                                    >
                                        {{
                                            profileLocation ||
                                            "Локация не указана"
                                        }}
                                    </span>
                                    <span
                                        class="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200"
                                    >
                                        {{ profileVisibility }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-3">
                            <UButton
                                class="ui-btn ui-btn-secondary"
                                color="primary"
                                size="lg"
                                icon="i-lucide-save"
                                :loading="saving"
                                @click="saveProfile"
                            >
                                Сохранить
                            </UButton>
                            <UButton
                                class="ui-btn ui-btn-secondary"
                                color="neutral"
                                variant="soft"
                                size="lg"
                                icon="i-lucide-log-out"
                                @click="clear"
                            >
                                Выйти
                            </UButton>
                        </div>
                    </div>
                </section>

                <section class="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
                    <div class="space-y-6">
                        <UCard
                            class="border-white/10 bg-white/5 shadow-lg shadow-black/10 backdrop-blur"
                        >
                            <template #header>
                                <div class="flex items-center justify-between">
                                    <div>
                                        <h2
                                            class="text-lg font-semibold text-white"
                                        >
                                            О себе
                                        </h2>
                                        <p class="mt-1 text-sm text-slate-400">
                                            Короткий текст, который видят другие
                                            участники платформы.
                                        </p>
                                    </div>
                                </div>
                            </template>

                            <div class="space-y-4">
                                <UTextarea
                                    v-model="aboutMe"
                                    :rows="6"
                                    autoresize
                                    placeholder="Напишите пару строк о себе..."
                                    class="w-full"
                                />

                                <div class="grid gap-4 md:grid-cols-2">
                                    <UInput
                                        v-model="department"
                                        placeholder="Кафедра"
                                    />

                                    <UInput
                                        v-if="profileRole === 'Студент'"
                                        v-model="group"
                                        placeholder="Номер группы"
                                    />

                                    <UInput
                                        v-model="profileLocation"
                                        placeholder="Город / страна"
                                    />

                                    <UInput
                                        v-model="profileHeadline"
                                        placeholder="Статус или подпись"
                                    />
                                </div>

                                <div class="flex flex-wrap gap-2">
                                    <span
                                        v-for="tag in profileTags"
                                        :key="tag"
                                        class="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-200"
                                    >
                                        #{{ tag }}
                                    </span>
                                </div>
                            </div>
                        </UCard>

                        <UCard
                            class="border-white/10 bg-white/5 shadow-lg shadow-black/10 backdrop-blur"
                        >
                            <template #header>
                                <div>
                                    <h2
                                        class="text-lg font-semibold text-white"
                                    >
                                        Недавняя активность
                                    </h2>
                                    <p class="mt-1 text-sm text-slate-400">
                                        Несколько блоков, которые делают
                                        страницу живой и не пустой.
                                    </p>
                                </div>
                            </template>

                            <div class="space-y-4">
                                <div
                                    v-for="item in activityFeed"
                                    :key="item.title"
                                    class="flex items-start gap-3 rounded-2xl bg-black/20 p-4"
                                >
                                    <div
                                        class="mt-0.5 rounded-full bg-white/10 p-2"
                                    >
                                        <UIcon
                                            :name="item.icon"
                                            class="text-cyan-300"
                                        />
                                    </div>
                                    <div>
                                        <p class="font-medium text-white">
                                            {{ item.title }}
                                        </p>
                                        <p
                                            class="mt-1 text-sm leading-6 text-slate-300"
                                        >
                                            {{ item.description }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </UCard>
                    </div>

                    <aside class="space-y-6">
                        <UCard
                            class="border-white/10 bg-white/5 shadow-lg shadow-black/10 backdrop-blur"
                        >
                            <template #header>
                                <h2 class="text-lg font-semibold text-white">
                                    Профиль
                                </h2>
                            </template>

                            <div class="space-y-4 text-sm text-slate-300">
                                <div
                                    class="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3"
                                >
                                    <span>Имя</span>
                                    <span class="text-white">{{
                                        displayName
                                    }}</span>
                                </div>
                                <div
                                    class="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3"
                                >
                                    <span>Почта</span>
                                    <span class="text-white">{{
                                        profileEmail
                                    }}</span>
                                </div>
                                <div
                                    class="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3"
                                >
                                    <span>Роль</span>
                                    <span class="text-white">{{
                                        profileRole
                                    }}</span>
                                </div>
                            </div>
                        </UCard>

                        <UCard
                            class="border-white/10 bg-white/5 shadow-lg shadow-black/10 backdrop-blur"
                        >
                            <template #header>
                                <h2 class="text-lg font-semibold text-white">
                                    Быстрые действия
                                </h2>
                            </template>

                            <div class="grid gap-3">
                                <UButton
                                    to="/chat"
                                    color="neutral"
                                    variant="soft"
                                    block
                                    icon="i-lucide-message-circle"
                                >
                                    Перейти в чат
                                </UButton>
                                <UButton
                                    to="/schedule"
                                    color="neutral"
                                    variant="soft"
                                    block
                                    icon="i-lucide-calendar-days"
                                >
                                    Открыть расписание
                                </UButton>
                                <UButton
                                    to="/"
                                    color="neutral"
                                    variant="soft"
                                    block
                                    icon="i-lucide-newspaper"
                                >
                                    Смотреть ленту
                                </UButton>
                            </div>
                        </UCard>

                        <UCard
                            class="border-white/10 bg-gradient-to-br from-white/8 to-white/5 shadow-lg shadow-black/10"
                        >
                            <template #header>
                                <h2 class="text-lg font-semibold text-white">
                                    Профиль заполнен на {{ completion }}%
                                </h2>
                            </template>

                            <div class="space-y-3 text-sm text-slate-300">
                                <UProgress :value="completion" />
                                <p class="leading-6">
                                    Добавь фото, пару строк о себе и город —
                                    профиль сразу станет живее и заметнее.
                                </p>
                            </div>
                        </UCard>
                    </aside>
                </section>
            </template>

            <template v-else>
                <section class="mx-auto max-w-3xl">
                    <UCard
                        class="overflow-hidden border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur"
                    >
                        <div class="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                            <div class="p-6 lg:p-8">
                                <UChip
                                    color="primary"
                                    variant="soft"
                                    size="lg"
                                    class="w-fit"
                                >
                                    Добро пожаловать
                                </UChip>

                                <h1
                                    class="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                                >
                                    Создайте профиль и начните общаться
                                </h1>

                                <p
                                    class="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base"
                                >
                                    Здесь появится ваша фотография, короткое
                                    описание, статус, интересы и все основные
                                    элементы личной страницы.
                                </p>

                                <div class="mt-6 grid gap-3 sm:grid-cols-2">
                                    <UButton
                                        to="/login"
                                        color="primary"
                                        size="lg"
                                        class="ui-btn ui-btn-secondary"
                                        block
                                    >
                                        Войти
                                    </UButton>
                                    <UButton
                                        class="ui-btn ui-btn-secondary"
                                        to="/login?mode=register"
                                        color="neutral"
                                        variant="soft"
                                        size="lg"
                                        block
                                    >
                                        Зарегистрироваться
                                    </UButton>
                                </div>

                                <div
                                    class="mt-8 space-y-3 text-sm text-slate-300"
                                >
                                    <div class="flex items-start gap-3">
                                        <UIcon
                                            name="i-lucide-user-round"
                                            class="mt-0.5 text-cyan-300"
                                        />
                                        <span
                                            >Личная карточка с фото, статусом и
                                            описанием.</span
                                        >
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <UIcon
                                            name="i-lucide-pen-line"
                                            class="mt-0.5 text-indigo-300"
                                        />
                                        <span
                                            >Блок “о себе” для короткой
                                            презентации.</span
                                        >
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <UIcon
                                            name="i-lucide-image-up"
                                            class="mt-0.5 text-fuchsia-300"
                                        />
                                        <span
                                            >Загрузка аватара для более живого
                                            профиля.</span
                                        >
                                    </div>
                                </div>
                            </div>

                            <div
                                class="border-t border-white/10 p-6 lg:border-l lg:border-t-0 lg:p-8"
                            >
                                <div
                                    class="flex h-full flex-col justify-between rounded-3xl bg-black/20 p-5"
                                >
                                    <div>
                                        <div
                                            class="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400/30 to-indigo-500/30 text-3xl font-semibold text-white"
                                        >
                                            U
                                        </div>

                                        <h2
                                            class="mt-5 text-xl font-semibold text-white"
                                        >
                                            Ваш профиль ещё пуст
                                        </h2>
                                        <p
                                            class="mt-2 text-sm leading-6 text-slate-300"
                                        >
                                            После входа здесь появятся сведения
                                            о вас, фото, интересы и персональные
                                            настройки.
                                        </p>
                                    </div>

                                    <div class="mt-8 grid gap-3">
                                        <div class="rounded-2xl bg-white/5 p-4">
                                            <p class="text-sm text-slate-400">
                                                Что будет здесь
                                            </p>
                                            <p class="mt-1 text-white">
                                                Фото, описание, активность,
                                                быстрые действия
                                            </p>
                                        </div>
                                        <div class="rounded-2xl bg-white/5 p-4">
                                            <p class="text-sm text-slate-400">
                                                Сейчас доступно
                                            </p>
                                            <p class="mt-1 text-white">
                                                Переход к входу и регистрации
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </UCard>
                </section>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from "#auth-utils";

const { user, loggedIn, clear } = useUserSession();

useHead({
    title: "Профиль",
    meta: [{ name: "description", content: "Личный профиль пользователя" }],
});

const saving = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const aboutMe = ref("");
const profileHeadline = ref("Открыт к общению и новым проектам");

const profileLocation = ref("");
const department = ref("");
const group = ref("");

const profilePhoto = ref<string>();
const profilePhotoPreview = ref<string>();

const profileTags = ref(["news", "community", "design", "nuxt"]);

const activityFeed = [
    {
        icon: "i-lucide-pencil-line",
        title: "Обновление профиля",
        description:
            "Добавьте описание и фотографию, чтобы страница выглядела завершённой.",
    },
    {
        icon: "i-lucide-bell",
        title: "Уведомления",
        description:
            "Здесь удобно показывать новые сообщения, реакции и упоминания.",
    },
    {
        icon: "i-lucide-star",
        title: "Избранное",
        description:
            "Можно собрать любимые материалы и быстрые ссылки на важные разделы.",
    },
];

const profileEmail = computed(() => {
    const current = user.value as Record<string, any> | null;
    return current?.email || "—";
});

const profileRole = computed(() => {
    const current = user.value;
    return current?.role === "teacher" ? "Преподаватель" : "Студент";
});

const displayName = computed(() => {
    const current = user.value as Record<string, any> | null;
    const parts = [current?.surname, current?.name].filter(Boolean);
    return parts.length ? parts.join(" ") : current?.email || "Пользователь";
});

const userInitials = computed(() => {
    const current = user.value as Record<string, any> | null;
    const name = displayName.value || current?.email || "U";
    return name
        .split(" ")
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();
});

const profileStatus = computed(() => profileHeadline.value || "Без статуса");
const profileVisibility = computed(() => "Публичный профиль");
const completion = computed(() => {
    let score = 20;
    if (aboutMe.value.trim()) score += 35;
    if (profileLocation.value.trim()) score += 15;
    if (profilePhoto.value || profilePhotoPreview.value) score += 20;
    if (profileHeadline.value.trim()) score += 10;
    return Math.min(score, 100);
});

onBeforeUnmount(() => {
    if (profilePhotoPreview.value?.startsWith("blob:")) {
        URL.revokeObjectURL(profilePhotoPreview.value);
    }
});
async function onPhotoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await $fetch<{ url: string }>("/api/upload", {
        method: "POST",
        body: formData,
    });

    profilePhoto.value = response.url;
}
async function saveProfile() {
    saving.value = true;

    try {
        await $fetch("/api/profile/update", {
            method: "POST",
            body: {
                body: {
                    avatarUrl: profilePhoto.value,
                    bio: aboutMe.value,
                    department: department.value,
                    group: group.value,
                },
            },
        });
    } finally {
        saving.value = false;
    }
}

onMounted(async () => {
    const profile = await $fetch<User>("/api/profile/me");

    aboutMe.value = profile.bio || "";
    department.value = profile.department || "";
    group.value = profile.group || "";
    profilePhoto.value = profile.avatarUrl || "";
});
</script>
