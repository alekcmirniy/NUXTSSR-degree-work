<template>
    <div
        class="fixed inset-0 w-screen h-screen bg-blue-600 text-white text-center p-4 flex flex-col items-center justify-center"
    >
        <div class="text-[30vh]">{{ error.status }}</div>
        <div class="text-4xl opacity-40 mb-5">{{ error.message }}</div>
        <div>
            <span>Возврат</span
            ><NuxtLink to="/" class="link mx-3"> домой </NuxtLink
            ><span>через {{ count }} секунд</span>
        </div>
        <div class="link" @click="goBack">Вернуться</div>
    </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
const router = useRouter();
const { error } = defineProps<{ error: NuxtError }>();

let intervalId = 0;
const count = ref<number>(10);

async function goBack(): Promise<void> {
    clearInterval(intervalId);
    if (window.history.length) router.back();
    else await navigateTo("/");
}

onMounted(() => {
    intervalId = setInterval(() => {
        count.value--;
    }, 1000);
});

onBeforeMount(() => {
    clearInterval(intervalId);
});

watch(count, async (newValue) => {
    if (newValue === 0) await navigateTo("/");
});
</script>

<style lang="scss" scoped>
.link {
    @apply mt-12 bg-white text-blue-500 px-6 py-3 rounded font-medium hover:bg-blue-50 transition-colors cursor-pointer;
}
</style>
