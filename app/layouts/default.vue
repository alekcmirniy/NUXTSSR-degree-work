<!-- layouts/default.vue -->

<script setup lang="ts">
import Footer from "~/components/organisms/footer.vue";
import Header from "~/components/organisms/header.vue";
</script>

<template>
    <div
        class="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100"
    >
        <!-- BACKGROUND -->
        <div
            class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_28%)]"
        />

        <div
            class="pointer-events-none absolute inset-0 opacity-[0.035]"
            style="
                background-image:
                    linear-gradient(
                        rgba(255, 255, 255, 0.7) 1px,
                        transparent 1px
                    ),
                    linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0.7) 1px,
                        transparent 1px
                    );
                background-size: 48px 48px;
            "
        />

        <!-- CONTENT -->
        <div class="relative z-10 flex min-h-screen flex-col">
            <Header />

            <main class="flex-1">
                <slot />
            </main>

            <Footer />
        </div>
    </div>
</template>
