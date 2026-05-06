<template>
    <article
        class="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/10 backdrop-blur"
    >
        <div
            class="flex items-start justify-between gap-4 border-b border-white/10 p-5"
        >
            <div class="space-y-1">
                <h3 class="text-lg font-semibold text-white">
                    {{ postData.headerText }}
                </h3>
                <p class="text-sm text-slate-400">
                    {{ postData.author }} · {{ postData.date }}
                </p>
            </div>

            <div
                class="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200"
            >
                ★ {{ postData.likes }}
            </div>
        </div>

        <div
            v-if="postData.image"
            class="aspect-[16/9] w-full overflow-hidden bg-black/20"
        >
            <img
                :src="postData.image"
                alt=""
                class="h-full w-full object-cover"
            />
        </div>

        <div class="p-5">
            <p class="whitespace-pre-line text-sm leading-7 text-slate-300">
                {{ postData.text }}
            </p>

            <div class="mt-5 flex flex-wrap gap-3 text-xs text-slate-400">
                <span>Комментариев: {{ postData.comments }}</span>
                <span>Просмотров: {{ postData.views }}</span>
                <span>Репостов: {{ postData.reposts }}</span>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import type { PostData } from "~/utils/interfaces/posts";

defineProps<{ postData: PostData }>();
</script>
