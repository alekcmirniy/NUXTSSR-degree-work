<template>
    <div class="w-full px-4 py-6 lg:px-8">
        <div class="mx-auto flex w-full max-w-7xl flex-col gap-6">
            <section
                class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-6 shadow-2xl shadow-black/20 lg:p-8"
            >
                <div
                    class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.22),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.14),transparent_32%)]"
                />

                <div class="relative flex flex-col gap-6">
                    <div class="space-y-3">
                        <UChip
                            color="primary"
                            variant="soft"
                            size="lg"
                            class="w-fit"
                        >
                            Люди
                        </UChip>

                        <div>
                            <h1
                                class="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
                            >
                                Найдите людей в сообществе
                            </h1>
                            <p
                                class="mt-3 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg"
                            >
                                Поиск по имени, ФИО, группе, кафедре и роли.
                                Карточки ведут в персональный профиль.
                            </p>
                        </div>
                    </div>

                    <UForm
                        :state="formState"
                        class="default-form grid gap-3 lg:grid-cols-[0.7fr_1.2fr_0.9fr_0.9fr_auto]"
                        @submit="applyFilters"
                    >
                        <USelect
                            v-model="formState.role"
                            :options="roleOptions"
                            placeholder="Роль"
                            size="xl"
                        />

                        <UInput
                            v-model="formState.search"
                            placeholder="Поиск по имени, ФИО, кафедре"
                            size="xl"
                        />

                        <UInput
                            v-model="formState.group"
                            placeholder="Группа"
                            size="xl"
                        />

                        <UInput
                            v-model="formState.department"
                            placeholder="Кафедра"
                            size="xl"
                        />

                        <UButton
                            class="ui-btn ui-btn-secondary"
                            type="submit"
                            size="xl"
                            color="primary"
                            :loading="pending"
                        >
                            Найти
                        </UButton>
                    </UForm>
                </div>
            </section>

            <section class="grid gap-4 md:grid-cols-3">
                <UCard class="border-white/10 bg-white/5">
                    <p class="text-sm text-slate-400">Найдено</p>
                    <p class="mt-2 text-2xl font-semibold text-white">
                        {{ people.length }}
                    </p>
                </UCard>
                <UCard class="border-white/10 bg-white/5">
                    <p class="text-sm text-slate-400">Студенты</p>
                    <p class="mt-2 text-2xl font-semibold text-white">
                        {{ studentsCount }}
                    </p>
                </UCard>
                <UCard class="border-white/10 bg-white/5">
                    <p class="text-sm text-slate-400">Преподаватели</p>
                    <p class="mt-2 text-2xl font-semibold text-white">
                        {{ teachersCount }}
                    </p>
                </UCard>
            </section>

            <section
                v-if="errorMessage"
                class="rounded-3xl border border-red-500/20 bg-red-500/10 p-5 text-red-100"
            >
                {{ errorMessage }}
            </section>

            <section
                v-if="pending && !people.length"
                class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
                <div
                    v-for="i in 6"
                    :key="i"
                    class="h-44 animate-pulse rounded-3xl border border-white/10 bg-white/5"
                />
            </section>

            <section
                v-else-if="!people.length"
                class="rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center text-slate-300"
            >
                Ничего не найдено. Попробуйте изменить фильтры или поиск.
            </section>

            <section v-else class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <PeopleCard
                    v-for="person in people"
                    :key="person.id"
                    :person="person"
                />
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { UserPreview, UserRole } from "~/utils/interfaces/users";

useHead({
    title: "Люди",
    meta: [{ name: "description", content: "Поиск людей в сообществе" }],
});

const roleOptions = [
    { label: "Все", value: "" },
    { label: "Студент", value: "student" },
    { label: "Преподаватель", value: "teacher" },
];

const formState = reactive({
    role: "" as "" | UserRole,
    search: "",
    group: "",
    department: "",
});

const people = ref<UserPreview[]>([]);
const pending = ref(false);
const errorMessage = ref<string | null>(null);

const studentsCount = computed(
    () => people.value.filter((p) => p.role === "student").length,
);
const teachersCount = computed(
    () => people.value.filter((p) => p.role === "teacher").length,
);

async function fetchPeople() {
    pending.value = true;
    errorMessage.value = null;

    try {
        const response = await $fetch<UserPreview[]>("/api/users", {
            query: {
                role: formState.role || undefined,
                search: formState.search || undefined,
                group: formState.group || undefined,
                department: formState.department || undefined,
            },
        });

        people.value = response;
    } catch (e: any) {
        errorMessage.value =
            e?.statusMessage || "Не удалось загрузить список людей";
        people.value = [];
    } finally {
        pending.value = false;
    }
}

async function applyFilters() {
    await fetchPeople();
}

await fetchPeople();
</script>
