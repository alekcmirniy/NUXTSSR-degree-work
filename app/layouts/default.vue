<script setup lang="ts">
import Footer from "~/components/organisms/footer.vue";
import Header from "~/components/organisms/header.vue";
</script>

<template>
    <div class="my-10 flex flex-col justify-between items-center">
        <Header />
        <div class="content size-full flex items-center justify-center">
            <slot />
        </div>

        <Footer />
    </div>
</template>

<style lang="scss" scoped></style>
