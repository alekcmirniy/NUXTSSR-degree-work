<template>
    <div class="w-full px-4 py-8 lg:px-8">
        <section
            class="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-stretch"
        >
            <div
                class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-6 shadow-2xl shadow-black/20 lg:p-8"
            >
                <div
                    class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.22),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.14),transparent_32%)]"
                />

                <div
                    class="relative flex h-full flex-col justify-between gap-8"
                >
                    <div class="space-y-5">
                        <UChip
                            color="primary"
                            variant="soft"
                            size="lg"
                            class="w-fit"
                        >
                            Добро пожаловать
                        </UChip>

                        <div class="space-y-3">
                            <h1
                                class="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl"
                            >
                                Вход в личный кабинет и создание нового профиля
                            </h1>
                            <p
                                class="max-w-xl text-base leading-7 text-slate-300 sm:text-lg"
                            >
                                Один аккаунт открывает доступ к ленте, профилю,
                                чату и всему остальному пространству платформы.
                            </p>
                        </div>

                        <div class="grid gap-3 sm:grid-cols-2">
                            <div
                                class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                            >
                                <div class="text-sm text-slate-400">
                                    Быстрый вход
                                </div>
                                <div class="mt-1 text-white">
                                    Возвращайтесь к своим публикациям и
                                    сообщениям
                                </div>
                            </div>
                            <div
                                class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                            >
                                <div class="text-sm text-slate-400">
                                    Новый профиль
                                </div>
                                <div class="mt-1 text-white">
                                    Заполните данные и настройте страницу под
                                    себя
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid gap-3 text-sm text-slate-300">
                        <div class="flex items-start gap-3">
                            <UIcon
                                name="i-lucide-shield-check"
                                class="mt-0.5 text-cyan-300"
                            />
                            <span
                                >Аккуратная форма входа без лишних
                                деталей.</span
                            >
                        </div>
                        <div class="flex items-start gap-3">
                            <UIcon
                                name="i-lucide-user-round-plus"
                                class="mt-0.5 text-indigo-300"
                            />
                            <span
                                >Регистрация с понятной структурой и полями
                                профиля.</span
                            >
                        </div>
                        <div class="flex items-start gap-3">
                            <UIcon
                                name="i-lucide-sparkles"
                                class="mt-0.5 text-fuchsia-300"
                            />
                            <span
                                >Интерфейс в едином тёмном стиле
                                платформы.</span
                            >
                        </div>
                    </div>
                </div>
            </div>

            <UCard
                class="border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur"
            >
                <template #header>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between gap-3">
                            <div>
                                <h2 class="text-2xl font-semibold text-white">
                                    {{
                                        currentForm === "login"
                                            ? "Вход"
                                            : "Регистрация"
                                    }}
                                </h2>
                                <p class="mt-1 text-sm text-slate-400">
                                    {{
                                        currentForm === "login"
                                            ? "Введите данные, чтобы продолжить."
                                            : "Создайте аккаунт за пару минут."
                                    }}
                                </p>
                            </div>

                            <div class="rounded-full bg-black/20 p-1">
                                <UButton
                                    size="sm"
                                    class="ui-btn ui-btn-secondary"
                                    :variant="
                                        currentForm === 'login'
                                            ? 'solid'
                                            : 'ghost'
                                    "
                                    :color="
                                        currentForm === 'login'
                                            ? 'primary'
                                            : 'neutral'
                                    "
                                    @click="setForm('login')"
                                >
                                    Вход
                                </UButton>
                                <UButton
                                    class="ui-btn ui-btn-secondary"
                                    size="sm"
                                    :variant="
                                        currentForm === 'register'
                                            ? 'solid'
                                            : 'ghost'
                                    "
                                    :color="
                                        currentForm === 'register'
                                            ? 'primary'
                                            : 'neutral'
                                    "
                                    @click="setForm('register')"
                                >
                                    Регистрация
                                </UButton>
                            </div>
                        </div>
                    </div>
                </template>

                <div class="space-y-6">
                    <LoginForm v-if="currentForm === 'login'" />
                    <RegisterForm v-else />

                    <div
                        class="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300"
                    >
                        <p class="leading-6">
                            После входа вы попадёте в профиль, где можно
                            добавить описание, фото и другие детали.
                        </p>
                    </div>
                </div>
            </UCard>
        </section>
    </div>
</template>

<script setup lang="ts">
type AvailableForm = "login" | "register";

const route = useRoute();

const currentForm = ref<AvailableForm>(
    route.query.mode === "register" ? "register" : "login",
);
function setForm(newVal: AvailableForm): void {
    if (currentForm.value === newVal) return;
    currentForm.value = newVal;
}
</script>
