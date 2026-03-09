<template>
    <aside
        v-if="isCurrentError"
        class="fixed top-0 right-0 w-[min(320px,70%)] p-4 pt-[calc(30px+0.625rem)] rounded-xl rounded-tr-none flex flex-col items-center gap-4 animate-fade-in shadow-lg"
        :style="{
            background:
                'linear-gradient(135deg, rgba(55, 65, 81, 0.95), rgba(17, 24, 39, 0.98))',
            backdropFilter: 'blur(4px)',
        }"
    >
        <h3
            class="text-2xl font-semibold text-center text-amber-500 break-words"
        >
            ⚠ Ошибка {{ currentError.name }}
        </h3>

        <button
            @click="switchErrorMessageVisibility"
            type="button"
            class="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200 font-medium"
        >
            {{ buttonMessage }}
        </button>

        <div
            v-if="isErrorMessageVisible"
            class="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white text-base leading-tight break-words overflow-hidden whitespace-normal"
            :class="{
                'opacity-100 max-h-96': isErrorMessageVisible,
                'opacity-0 max-h-0': !isErrorMessageVisible,
            }"
        >
            {{ currentError.message }}
        </div>

        <button
            @click="handleCloseWindow"
            class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 text-xl font-medium"
            type="button"
        >
            ✕
        </button>
    </aside>
</template>

<script setup lang="ts">
import { useHandleError } from "#imports";
import { computed, ref } from "vue";

const { currentError, closeError: closeWindow } = useHandleError();

const handleCloseWindow = () => {
    isErrorMessageVisible.value = false;
    closeWindow();
};

const isCurrentError = computed(() => {
    return currentError.message.length && currentError.name.length;
});

const isErrorMessageVisible = ref(false);

const switchErrorMessageVisibility = () => {
    isErrorMessageVisible.value = !isErrorMessageVisible.value;
};

const buttonMessage = computed(() => {
    return isErrorMessageVisible.value ? "Свернуть" : "Показать";
});
</script>

<style>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.4s ease-out;
}
</style>
