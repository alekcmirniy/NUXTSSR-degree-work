<template>
    <div>Добро пожаловать,{{ user }}</div>
    <div @click="clear">Выйти</div>
</template>

<script lang="ts" setup>
import { useUserSession } from "#imports";

const { user, loggedIn, clear } = useUserSession();

definePageMeta({ middleware: "auth" });

useWatchSession();
</script>

<style lang="scss" scoped></style>
