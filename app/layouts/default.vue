<script setup lang="ts">
import Footer from "~/components/footer.vue";
import Header from "~/components/header.vue";
</script>

<template>
    <div class="my-10 flex flex-col justify-center items-center gap-10">
        <Header />
        <slot />
        <Footer />
    </div>
</template>
