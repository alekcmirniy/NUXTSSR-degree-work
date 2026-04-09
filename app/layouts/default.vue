<script setup lang="ts">
import Footer from "~/components/footer.vue";
import Header from "~/components/header.vue";
</script>

<template>
    <div class="my-10 flex flex-col justify-between items-center layout">
        <Header />
        <div class="content size-full flex items-center justify-center">
            <slot />
        </div>

        <Footer />
    </div>
</template>

<style lang="scss" scoped>
$layout_height: calc(100vh - 5em);
.layout {
    height: $layout_height;
}
</style>
