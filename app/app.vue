<template>
    <div>
        <NuxtRouteAnnouncer />
        <NotifyError />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script lang="ts" setup>
import NotifyError from "./utils/handlers/notify-error.vue";

useHead({ title: "ГУАП - Социальная площадка", htmlAttrs: { lang: "ru" } });
</script>
<style lang="scss"></style>
