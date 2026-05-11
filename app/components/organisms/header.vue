<template>
    <header
        class="w-full border-b border-white/10 bg-slate-950/80 backdrop-blur"
    >
        <div
            class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 lg:px-8"
        >
            <NuxtLink
                to="/"
                class="text-lg font-semibold tracking-tight text-white"
            >
                NuxtSSR
            </NuxtLink>

            <nav class="flex flex-wrap items-center justify-end gap-2 sm:gap-4">
                <NuxtLink to="/" class="link" exact-active-class="link-active"
                    >Главная</NuxtLink
                >
                <NuxtLink to="/profile" class="link" active-class="link-active"
                    >Профиль</NuxtLink
                >
                <NuxtLink to="/schedule" class="link" active-class="link-active"
                    >Расписание</NuxtLink
                >
                <NuxtLink to="/chat" class="link" active-class="link-active"
                    >Чат</NuxtLink
                >
                <NuxtLink to="/credits" class="link" active-class="link-active"
                    >О нас</NuxtLink
                >
            </nav>
        </div>
    </header>
</template>

<style scoped lang="scss">
.link {
    @apply rounded-full px-3 py-2 text-sm text-slate-300 transition-colors hover:text-white hover:bg-white/5;
}

.link-active {
    @apply bg-white/10 text-white;
}
</style>
