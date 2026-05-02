<template>
    <div v-if="loggedIn">
        <div>Добро пожаловать,{{ user }}</div>
        <div @click="clear">Выйти</div>
    </div>
    <div v-else>
        <div>Войти</div>
    </div>
</template>

<script lang="ts" setup>
import { useUserSession } from "#imports";

const { user, loggedIn, clear, fetch } = useUserSession();

definePageMeta({ middleware: "auth" });

//проблема - на странице профиля перезагрузка и всё слетает на логин.

watch(
    loggedIn,
    () => {
        if (!loggedIn.value) navigateTo("/login");
    },
    { immediate: true },
);

onMounted(async () => await fetch());
</script>

<style lang="scss" scoped></style>
