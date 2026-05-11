<!-- components/organisms/Footer.vue -->

<template>
    <footer class="border-t border-white/10">
        <div
            class="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between lg:px-8"
        >
            <div class="flex items-center gap-3">
                <div
                    class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white"
                >
                    N
                </div>

                <div>
                    <p class="font-medium text-slate-200">NuxtSSR Platform</p>
                    <p class="text-xs text-slate-500">
                        Пространство для общения и публикаций
                    </p>
                </div>
            </div>

            <div
                class="flex flex-wrap items-center gap-3 text-xs text-slate-500"
            >
                <span>SSR</span>
                <span>Nuxt 4</span>
                <span>Vue 3</span>
                <span>Drizzle ORM</span>
            </div>
        </div>
    </footer>
</template>
