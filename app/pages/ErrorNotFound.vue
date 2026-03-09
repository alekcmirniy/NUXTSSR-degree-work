<template>
    <div
        class="fixed inset-0 w-screen h-screen bg-blue-500 text-white text-center p-4 flex items-center justify-center"
    >
        <div>
            <div class="text-[30vh]">404</div>
            <div class="text-4xl" style="opacity: 0.4">Ничего не найдено</div>
            <nuxt-link
                to="/"
                class="mt-12 bg-white text-blue-500 px-6 py-3 rounded font-medium hover:bg-blue-50 transition-colors no-uppercase"
            >
                Домой
            </nuxt-link>
        </div>
    </div>
</template>
