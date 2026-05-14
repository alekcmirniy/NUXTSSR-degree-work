<template>
    <button
        class="group w-full rounded-3xl border p-4 text-left transition hover:-translate-y-0.5"
        :class="
            active
                ? 'border-white/20 bg-white/10'
                : 'border-white/10 bg-white/5 hover:bg-white/8'
        "
        @click="$emit('select')"
    >
        <div class="flex items-start gap-3">
            <div
                class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-400/25 to-indigo-500/25 text-sm font-semibold text-white"
            >
                <img
                    v-if="conversation.otherUser.avatarUrl"
                    :src="conversation.otherUser.avatarUrl"
                    alt="avatar"
                    class="h-full w-full object-cover"
                />
                <span v-else>{{ initials }}</span>
            </div>

            <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-2">
                    <div class="min-w-0">
                        <p class="truncate font-semibold text-white">
                            {{ fullName }}
                        </p>
                        <p class="text-xs text-slate-400">{{ subtitle }}</p>
                    </div>
                    <span
                        v-if="conversation.unreadCount"
                        class="rounded-full bg-cyan-400 px-2 py-1 text-xs font-semibold text-slate-950"
                    >
                        {{ conversation.unreadCount }}
                    </span>
                </div>

                <p class="mt-2 line-clamp-1 text-sm text-slate-300">
                    {{ lastMessagePreview }}
                </p>

                <p class="mt-2 text-xs text-slate-500">{{ timeLabel }}</p>
            </div>
        </div>
    </button>
</template>

<script setup lang="ts">
import type { ConversationPreview } from "~/utils/interfaces/chat";

const props = defineProps<{
    conversation: ConversationPreview;
    active?: boolean;
}>();

defineEmits<{ select: [] }>();

const fullName = computed(() => {
    const u = props.conversation.otherUser;
    return [u.surname, u.name, u.patronymic].filter(Boolean).join(" ");
});

const initials = computed(() => {
    const u = props.conversation.otherUser;
    return [u.surname?.[0], u.name?.[0]].filter(Boolean).join("").toUpperCase();
});

const subtitle = computed(() => {
    const u = props.conversation.otherUser;
    return u.role === "teacher"
        ? u.department || "Преподаватель"
        : [u.group, u.department].filter(Boolean).join(" · ") || "Студент";
});

const lastMessagePreview = computed(
    () => props.conversation.lastMessage?.content || "Нет сообщений",
);

const timeLabel = computed(() => {
    const date =
        props.conversation.lastMessage?.createdAt ||
        props.conversation.updatedAt;
    return new Date(date).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
});
</script>
