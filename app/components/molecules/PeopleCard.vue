<template>
    <NuxtLink
        :to="`/people/${person.id}`"
        class="group block overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/8"
    >
        <div class="flex items-start gap-4">
            <div class="relative h-16 w-16 shrink-0">
                <div
                    class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-400/25 to-indigo-500/25 text-lg font-semibold text-white"
                >
                    <img
                        v-if="person.avatarUrl"
                        :src="person.avatarUrl"
                        alt="Avatar"
                        class="h-full w-full object-cover"
                    />
                    <span v-else>{{ initials }}</span>
                </div>
            </div>

            <div class="min-w-0 flex-1 space-y-2">
                <div class="flex items-start justify-between gap-3">
                    <div class="min-w-0">
                        <h3 class="truncate text-lg font-semibold text-white">
                            {{ fullName }}
                        </h3>
                        <p class="text-sm text-slate-400">
                            {{ roleLabel }}
                        </p>
                    </div>

                    <div
                        class="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200"
                    >
                        {{ badgeText }}
                    </div>
                </div>

                <p
                    v-if="person.bio"
                    class="line-clamp-2 text-sm leading-6 text-slate-300"
                >
                    {{ person.bio }}
                </p>

                <div class="flex flex-wrap gap-2 text-xs text-slate-400">
                    <span
                        v-if="person.group"
                        class="rounded-full bg-black/20 px-3 py-1"
                    >
                        Группа: {{ person.group }}
                    </span>
                    <span
                        v-if="person.department"
                        class="rounded-full bg-black/20 px-3 py-1"
                    >
                        {{ person.department }}
                    </span>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { UserPreview } from "~/utils/interfaces/users";

const props = defineProps<{ person: UserPreview }>();

const fullName = computed(() => {
    const parts = [
        props.person.surname,
        props.person.name,
        props.person.patronymic,
    ]
        .filter(Boolean)
        .map(String);
    return parts.join(" ");
});

const initials = computed(() => {
    return [props.person.surname?.[0], props.person.name?.[0]]
        .filter(Boolean)
        .join("")
        .toUpperCase();
});

const roleLabel = computed(() =>
    props.person.role === "teacher" ? "Преподаватель" : "Студент",
);
const badgeText = computed(() =>
    props.person.role === "teacher" ? "Teacher" : "Student",
);
</script>
