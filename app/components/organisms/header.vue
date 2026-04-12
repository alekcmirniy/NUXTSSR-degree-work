<template>
    <div class="w-full header">
        <ul class="flex justify-evenly">
            <li>
                <NuxtLink to="/" class="link">Главная</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/profile" class="link">Профиль</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/shedule" class="link">Расписание</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/chat" class="link">Чат</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/credits" class="link">О нас</NuxtLink>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.link {
    @apply hover:text-blue-500 transition-colors;
    border: solid 2px brown;
}
</style>
