<template>
    <div class="w-full px-4 py-10 lg:px-8">
        <div class="mx-auto flex w-full max-w-7xl flex-col gap-8">
            <section
                class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 px-8 py-12 shadow-2xl shadow-black/30"
            >
                <div
                    class="absolute -right-20 top-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
                />

                <div
                    class="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"
                />

                <div class="relative z-10 max-w-4xl">
                    <UBadge color="primary" variant="soft" size="lg">
                        О платформе
                    </UBadge>

                    <h1
                        class="mt-5 text-4xl font-semibold tracking-tight text-white lg:text-6xl"
                    >
                        Университетское digital-пространство
                    </h1>

                    <p
                        class="mt-6 max-w-3xl text-base leading-8 text-slate-300 lg:text-lg"
                    >
                        Платформа объединяет студентов, преподавателей и
                        университетское сообщество в единой современной среде.
                        Здесь можно следить за новостями, находить людей,
                        обмениваться сообщениями и быстро получать доступ к
                        учебной информации.
                    </p>

                    <div class="mt-8 flex flex-wrap gap-4">
                        <UButton
                            class="ui-btn ui-btn-secondary"
                            to="https://priem.guap.ru/bach"
                            target="_blank"
                            size="lg"
                            color="primary"
                        >
                            Бакалавриат
                        </UButton>

                        <UButton
                            class="ui-btn ui-btn-secondary"
                            to="https://priem.guap.ru/mag"
                            target="_blank"
                            size="lg"
                            color="neutral"
                            variant="soft"
                        >
                            Магистратура
                        </UButton>
                    </div>
                </div>
            </section>

            <section class="grid gap-6 lg:grid-cols-3">
                <article
                    class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                    <div
                        class="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300"
                    >
                        <UIcon name="i-lucide-building-2" class="text-2xl" />
                    </div>

                    <h2 class="mt-5 text-xl font-semibold text-white">
                        О ГУАП
                    </h2>

                    <p class="mt-4 text-sm leading-7 text-slate-300">
                        Государственный университет аэрокосмического
                        приборостроения — современный технологический вуз,
                        ориентированный на инженерное образование, IT, цифровые
                        системы и прикладные исследования.
                    </p>
                </article>

                <article
                    class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                    <div
                        class="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-400/10 text-indigo-300"
                    >
                        <UIcon name="i-lucide-users" class="text-2xl" />
                    </div>

                    <h2 class="mt-5 text-xl font-semibold text-white">
                        Сообщество
                    </h2>

                    <p class="mt-4 text-sm leading-7 text-slate-300">
                        Сервис создавался как единое пространство для общения,
                        взаимодействия между студентами и преподавателями,
                        обмена информацией и быстрого доступа к университетским
                        сервисам.
                    </p>
                </article>

                <article
                    class="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                    <div
                        class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300"
                    >
                        <UIcon
                            name="i-lucide-layout-dashboard"
                            class="text-2xl"
                        />
                    </div>

                    <h2 class="mt-5 text-xl font-semibold text-white">
                        Возможности
                    </h2>

                    <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                        <li>• Новости и университетские публикации</li>
                        <li>• Поиск студентов и преподавателей</li>
                        <li>• Личные сообщения и коммуникация</li>
                        <li>• Просмотр расписания групп</li>
                        <li>• Профили пользователей</li>
                    </ul>
                </article>
            </section>

            <section
                class="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 lg:grid-cols-[1fr_0.8fr]"
            >
                <div>
                    <UBadge color="neutral" variant="soft"> Разработка </UBadge>

                    <h2 class="mt-4 text-3xl font-semibold text-white">
                        О проекте
                    </h2>

                    <p class="mt-5 text-sm leading-8 text-slate-300">
                        Архитектура платформы построена на Nuxt SSR с упором на
                        современный UX, скорость загрузки и серверный рендеринг.
                        Интерфейс проектируется как полноценная цифровая среда
                        для университета с возможностью дальнейшего расширения:
                        уведомления, мероприятия, студенческие сообщества,
                        образовательные сервисы и интеграции.
                    </p>

                    <div class="mt-8 grid gap-4 md:grid-cols-2">
                        <div
                            class="rounded-2xl border border-white/10 bg-black/20 p-5"
                        >
                            <p class="text-sm text-slate-400">Frontend</p>
                            <p class="mt-2 font-medium text-white">
                                Nuxt 4 · Vue 3 · Tailwind · SSR
                            </p>
                        </div>

                        <div
                            class="rounded-2xl border border-white/10 bg-black/20 p-5"
                        >
                            <p class="text-sm text-slate-400">Backend</p>
                            <p class="mt-2 font-medium text-white">
                                Nitro · Drizzle ORM · SQLite
                            </p>
                        </div>
                    </div>
                </div>

                <aside
                    class="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6"
                >
                    <div
                        class="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-400/10 text-cyan-300"
                    >
                        <UIcon name="i-lucide-code-2" class="text-3xl" />
                    </div>

                    <h3 class="mt-6 text-2xl font-semibold text-white">
                        Контакты разработчика
                    </h3>

                    <div class="mt-6 space-y-4 text-sm text-slate-300">
                        <div>
                            <p class="text-slate-500">Email</p>
                            <a
                                href="mailto:your-email@example.com"
                                class="transition hover:text-cyan-300"
                            >
                                alekcmirniy@bk.ru
                            </a>
                        </div>

                        <div>
                            <p class="text-slate-500">Telegram</p>
                            <a
                                href="https://t.me/yourusername"
                                target="_blank"
                                class="transition hover:text-cyan-300"
                            >
                                @m1rn1yy
                            </a>
                        </div>

                        <div>
                            <p class="text-slate-500">GitHub</p>
                            <a
                                href="https://github.com/yourusername"
                                target="_blank"
                                class="transition hover:text-cyan-300"
                            >
                                github.com/alekcmirniy
                            </a>
                        </div>
                    </div>
                </aside>
            </section>

            <section
                class="rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 px-8 py-10"
            >
                <div
                    class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
                >
                    <div>
                        <h2 class="text-3xl font-semibold text-white">
                            Будущее платформы
                        </h2>

                        <p
                            class="mt-4 max-w-3xl text-sm leading-8 text-slate-300"
                        >
                            В дальнейшем система может быть дополнена
                            университетскими мероприятиями, уведомлениями,
                            интеграцией с LMS, рейтингами активности,
                            студенческими объединениями и системой цифровых
                            достижений.
                        </p>
                    </div>

                    <div class="flex gap-4">
                        <UButton
                            class="ui-btn ui-btn-secondary"
                            to="/"
                            size="lg"
                            color="primary"
                        >
                            На главную
                        </UButton>

                        <UButton
                            to="/people"
                            size="lg"
                            class="ui-btn ui-btn-secondary"
                            color="neutral"
                            variant="soft"
                        >
                            Сообщество
                        </UButton>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: "О платформе",
    description:
        "Информация о платформе университетского сообщества, поступлении и цифровой среде ГУАП.",
});
</script>
