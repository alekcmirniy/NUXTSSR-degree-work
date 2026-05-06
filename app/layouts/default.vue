<script setup lang="ts">
import Footer from "~/components/organisms/footer.vue";
import Header from "~/components/organisms/header.vue";
</script>

<template>
    <div class="min-h-screen w-full bg-slate-950 text-slate-100">
        <Header />

        <div class="content w-full flex-1">
            <slot />
        </div>

        <Footer />
    </div>
</template>
