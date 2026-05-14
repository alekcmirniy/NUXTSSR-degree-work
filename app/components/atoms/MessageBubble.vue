<template>
    <div class="flex" :class="mine ? 'justify-end' : 'justify-start'">
        <div
            class="max-w-[85%] rounded-3xl px-4 py-3 shadow-lg"
            :class="
                mine
                    ? 'bg-cyan-400 text-slate-950'
                    : 'border border-white/10 bg-white/5 text-white'
            "
        >
            <p class="whitespace-pre-line text-sm leading-6">
                {{ message.content }}
            </p>
            <p class="mt-2 text-[11px] opacity-70">
                {{ timeLabel }}
                <span v-if="mine">· Вы</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from "~/utils/interfaces/chat";

const props = defineProps<{
    message: ChatMessage;
    mine: boolean;
}>();

const timeLabel = computed(() =>
    new Date(props.message.createdAt).toLocaleString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
    }),
);
</script>
