<template>
    <section class="flex flex-col">
        <header class="flex">
            <h1>{{ postData.headerText }}</h1>
            <aside class="flex flex-col">
                <div>⚝</div>
                <div>{{ "преобразованная дата" }}</div>
            </aside>
        </header>

        <main>
            <!-- IMG -->
        </main>

        <footer class="flex flex-col">
            <p>Author: {{ postData.author }}</p>
            <p class="text-center">{{ postData.epigraph }}</p>
        </footer>
    </section>
</template>

<script lang="ts" setup>
import type { PostData } from "../utils/interfaces/posts";

const { postData } = defineProps<{ postData: PostData }>();

const transformData = () => {
    //преобразование даты под шаблон
};
</script>
