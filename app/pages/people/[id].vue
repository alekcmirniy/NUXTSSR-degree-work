<template>
    <div class="w-full px-4 py-6 lg:px-8">
        <div class="mx-auto w-full max-w-5xl">
            <UButton
                to="/people"
                color="primary"
                variant="soft"
                class="mb-4 ui-btn ui-btn-secondary"
            >
                ← К списку людей
            </UButton>

            <UCard
                v-if="person"
                class="overflow-hidden border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur"
            >
                <div class="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                    <div class="p-6 lg:p-8">
                        <div class="flex items-start gap-4">
                            <div
                                class="h-24 w-48 overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-400/25 to-indigo-500/25 text-3xl font-semibold text-white"
                            >
                                <img
                                    v-if="person.avatarUrl"
                                    :src="person.avatarUrl"
                                    alt="Avatar"
                                    class="h-full w-full object-cover"
                                />
                                <div
                                    v-else
                                    class="flex h-full w-full items-center justify-center"
                                >
                                    {{ initials }}
                                </div>
                            </div>

                            <div class="space-y-2">
                                <UChip
                                    color="primary"
                                    variant="soft"
                                    size="lg"
                                    class="w-fit"
                                >
                                    {{ personRole }}
                                </UChip>
                                <h1 class="text-3xl font-semibold text-white">
                                    {{ fullName }}
                                </h1>
                                <p class="text-sm text-slate-400">
                                    {{
                                        "Кафедра " + person.department ||
                                        "Кафедра не указана"
                                    }}
                                </p>
                            </div>
                        </div>

                        <div class="mt-6 space-y-3 text-sm text-slate-300">
                            <div
                                v-if="person.group"
                                class="rounded-2xl bg-black/20 px-4 py-3"
                            >
                                Группа:
                                <span class="text-white">{{
                                    person.group
                                }}</span>
                            </div>
                            <div class="rounded-2xl bg-black/20 px-4 py-3">
                                Email:
                                <span class="text-white">{{
                                    person.email
                                }}</span>
                            </div>
                            <div class="rounded-2xl bg-black/20 px-4 py-3">
                                Роль:
                                <span class="text-white">{{ personRole }}</span>
                            </div>
                        </div>
                    </div>

                    <div
                        class="flex flex-col items-center border-t border-white/10 p-6 lg:border-l lg:border-t-0 lg:p-8"
                    >
                        <h2 class="text-lg font-semibold text-white">
                            О пользователе
                        </h2>
                        <p
                            class="mt-3 whitespace-pre-line text-sm leading-7 text-slate-300"
                        >
                            {{ person.bio || defaultBio }}
                        </p>

                        <div class="mt-8 grid gap-3 sm:grid-cols-3">
                            <UCard class="border-white/10 bg-white/5">
                                <p class="text-xs text-slate-400">Группа</p>
                                <p class="mt-1 text-lg text-white">
                                    {{ person.group || "—" }}
                                </p>
                            </UCard>
                            <UCard class="border-white/10 bg-white/5">
                                <p class="text-xs text-slate-400">Кафедра</p>
                                <p class="mt-1 text-lg text-white">
                                    {{ person.department || "—" }}
                                </p>
                            </UCard>
                            <UCard class="border-white/10 bg-white/5">
                                <p class="text-xs text-slate-400">Аккаунт</p>
                                <p class="mt-1 text-lg text-white">Активен</p>
                            </UCard>
                        </div>

                        <div class="mt-8 flex flex-wrap gap-3">
                            <UButton
                                v-if="canWriteMessage"
                                :to="{
                                    path: '/chat',
                                    query: { with: person.id },
                                }"
                                color="primary"
                                size="lg"
                                class="ui-btn ui-btn-secondary"
                            >
                                Написать в чате
                            </UButton>

                            <UButton
                                v-else
                                color="primary"
                                variant="soft"
                                size="lg"
                                disabled
                                class="ui-btn ui-btn-secondary"
                            >
                                Это ваш профиль
                            </UButton>
                        </div>
                    </div>
                </div>
            </UCard>

            <UAlert
                v-else-if="errorMessage"
                color="error"
                variant="soft"
                :title="errorMessage"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { UserProfile } from "~/utils/interfaces/users";

const route = useRoute();
const { user } = useUserSession();

const { data: person, error } = await useFetch<UserProfile>(
    `/api/users/${route.params.id}`,
);

const personRole = computed<"Студент" | "Преподаватель">(() =>
    person.value?.role === "student" ? "Студент" : "Преподаватель",
);

const currentUserId = computed(() => Number((user.value as any)?.id));
const personId = computed(() => Number(route.params.id));

const fullName = computed(() => {
    if (!person.value) return "";
    return [person.value.surname, person.value.name, person.value.patronymic]
        .filter(Boolean)
        .join(" ");
});

const initials = computed(() => {
    if (!person.value) return "";
    return [person.value.surname?.[0], person.value.name?.[0]]
        .filter(Boolean)
        .join("")
        .toUpperCase();
});

const canWriteMessage = computed(() => {
    return (
        Number.isFinite(currentUserId.value) &&
        currentUserId.value !== personId.value
    );
});

const defaultBio = "Пользователь ещё не заполнил информацию о себе.";
const errorMessage = computed(
    () => error.value?.statusMessage || "Пользователь не найден",
);
</script>
