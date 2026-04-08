<template>
    <div>
        <NuxtRouteAnnouncer />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script lang="ts" setup>
useHead({ title: "ГУАП - Социальная площадка", htmlAttrs: { lang: "ru" } });
</script>
<style lang="scss"></style>
