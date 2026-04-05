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

const { session, user, ready, openInPopup, loggedIn, fetch, clear } =
    useUserSession();

definePageMeta({ middleware: "auth" });
</script>

<style lang="scss" scoped></style>
