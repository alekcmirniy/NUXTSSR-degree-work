<template>
    <div class="w-full px-4 py-6 lg:px-8">
        <div class="mx-auto flex w-full max-w-7xl flex-col gap-6">
            <section
                class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-6 shadow-2xl shadow-black/20 lg:p-8"
            >
                <div
                    class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.22),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.14),transparent_32%)]"
                />

                <div
                    class="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
                >
                    <div class="space-y-3">
                        <UChip
                            color="primary"
                            variant="soft"
                            size="lg"
                            class="w-fit"
                        >
                            Расписание
                        </UChip>

                        <div>
                            <h1
                                class="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
                            >
                                Расписание занятий
                            </h1>

                            <p
                                class="mt-3 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg"
                            >
                                Введите номер группы и получите актуальное
                                расписание в удобном виде.
                            </p>
                        </div>
                    </div>

                    <UForm
                        :state="formState"
                        class="default-form flex w-full max-w-xl flex-col gap-3 sm:flex-row"
                        @submit="loadSchedule"
                    >
                        <UInput
                            v-model="formState.group"
                            placeholder="Например: 2251"
                            size="xl"
                            class="w-full"
                        />

                        <UButton
                            class="ui-btn ui-btn-secondary"
                            type="submit"
                            color="primary"
                            size="xl"
                            :loading="pending"
                        >
                            Смотреть
                        </UButton>
                    </UForm>
                </div>
            </section>

            <template v-if="schedule">
                <section class="grid gap-4 md:grid-cols-3">
                    <UCard class="border-white/10 bg-white/5">
                        <p class="text-sm text-slate-400">Группа</p>
                        <p class="mt-2 text-2xl font-semibold text-white">
                            {{ schedule.group }}
                        </p>
                    </UCard>

                    <UCard class="border-white/10 bg-white/5">
                        <p class="text-sm text-slate-400">Дней в расписании</p>
                        <p class="mt-2 text-2xl font-semibold text-white">
                            {{ schedule.days.length }}
                        </p>
                    </UCard>

                    <UCard class="border-white/10 bg-white/5">
                        <p class="text-sm text-slate-400">Обновлено</p>
                        <p class="mt-2 text-sm text-white">
                            {{ formatDate(schedule.updatedAt) }}
                        </p>
                    </UCard>
                </section>

                <section class="space-y-5">
                    <div
                        v-for="day in schedule.days"
                        :key="day.day"
                        class="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/10"
                    >
                        <div class="border-b border-white/10 px-5 py-4">
                            <h2 class="text-xl font-semibold text-white">
                                {{ day.day }}
                            </h2>
                        </div>

                        <div v-if="day.lessons.length" class="grid gap-4 p-5">
                            <div
                                v-for="lesson in day.lessons"
                                :key="lesson.id"
                                class="rounded-2xl border border-white/10 bg-black/20 p-4"
                            >
                                <div
                                    class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"
                                >
                                    <div class="space-y-2">
                                        <div
                                            class="flex flex-wrap items-center gap-2"
                                        >
                                            <span
                                                class="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300"
                                            >
                                                {{
                                                    lesson.lessonType ||
                                                    "Занятие"
                                                }}
                                            </span>

                                            <span
                                                v-if="lesson.weekType"
                                                class="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300"
                                            >
                                                {{ lesson.weekType }}
                                            </span>
                                        </div>

                                        <h3
                                            class="text-lg font-semibold text-white"
                                        >
                                            {{ lesson.subject }}
                                        </h3>

                                        <div
                                            class="flex flex-wrap gap-4 text-sm text-slate-300"
                                        >
                                            <div
                                                class="flex items-center gap-2"
                                            >
                                                <UIcon
                                                    name="i-lucide-user-round"
                                                />
                                                <span>{{
                                                    lesson.teacher
                                                }}</span>
                                            </div>

                                            <div
                                                class="flex items-center gap-2"
                                            >
                                                <UIcon
                                                    name="i-lucide-map-pinned"
                                                />
                                                <span>{{
                                                    lesson.classroom
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class="rounded-2xl bg-white/5 px-4 py-3 text-center"
                                    >
                                        <div class="text-xs text-slate-400">
                                            Время
                                        </div>
                                        <div
                                            class="mt-1 text-base font-semibold text-white"
                                        >
                                            {{ lesson.startTime }}
                                        </div>
                                        <div class="text-sm text-slate-400">
                                            {{ lesson.endTime }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="p-6 text-sm text-slate-400">
                            На этот день занятий нет.
                        </div>
                    </div>
                </section>
            </template>

            <UAlert
                v-if="errorMessage"
                color="error"
                variant="soft"
                :title="errorMessage"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ParsedSchedule } from "../../server/utils/types";

const formState = reactive({
    group: "",
});

const pending = ref(false);
const schedule = ref<ParsedSchedule | null>(null);
const errorMessage = ref<string | null>(null);

async function loadSchedule() {
    if (!formState.group.trim()) return;

    pending.value = true;
    errorMessage.value = null;

    try {
        const response = await $fetch<ParsedSchedule>("/api/schedule", {
            query: {
                group: formState.group,
            },
        });

        schedule.value = response;
    } catch (e: any) {
        errorMessage.value =
            e?.statusMessage || "Не удалось загрузить расписание";
    } finally {
        pending.value = false;
    }
}

function formatDate(date: string) {
    return new Date(date).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
    });
}
</script>
