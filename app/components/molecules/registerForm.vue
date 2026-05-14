<!-- components/RegisterForm.vue -->
<template>
    <UForm
        :validate-on="['input']"
        :state="formState"
        :schema="formSchema"
        class="space-y-5"
        @submit="onSubmit"
    >
        <div class="grid gap-4 md:grid-cols-2">
            <UFormField label="Имя" name="name">
                <UInput
                    v-model="formState.name"
                    type="text"
                    autocomplete="given-name"
                    placeholder="Иван"
                    class="w-full"
                />
            </UFormField>

            <UFormField label="Фамилия" name="surname">
                <UInput
                    v-model="formState.surname"
                    type="text"
                    autocomplete="family-name"
                    placeholder="Иванов"
                    class="w-full"
                />
            </UFormField>
        </div>

        <UFormField label="Отчество" name="patronymic">
            <UInput
                v-model="formState.patronymic"
                type="text"
                autocomplete="additional-name"
                placeholder="Иванович"
                class="w-full"
            />
        </UFormField>

        <UFormField label="Почта" name="email">
            <UInput
                v-model="formState.email"
                type="email"
                autocomplete="email"
                placeholder="name@example.com"
                class="w-full"
            />
        </UFormField>

        <div class="grid gap-4 md:grid-cols-2">
            <UFormField label="Пароль" name="password">
                <UInput
                    v-model="formState.password"
                    type="password"
                    autocomplete="new-password"
                    placeholder="Минимум 8 символов"
                    class="w-full"
                />
            </UFormField>

            <UFormField label="Повторите пароль" name="confirmPassword">
                <UInput
                    v-model="formState.confirmPassword"
                    type="password"
                    autocomplete="new-password"
                    placeholder="Повторите пароль"
                    class="w-full"
                />
            </UFormField>

            <UFormField name="isTeacher">
                <UCheckbox
                    v-model="formState.isTeacher"
                    label="Я преподаватель"
                />
            </UFormField>
        </div>

        <div
            class="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300"
        >
            После регистрации профиль можно сразу дополнить фото, описанием и
            личной подписью.
        </div>

        <UButton type="submit" color="primary" size="lg" block>
            Зарегистрироваться
        </UButton>
    </UForm>
</template>

<script lang="ts" setup>
import * as z from "zod";

const { handleError } = useHandleError();

const formSchema = z
    .object({
        name: z
            .string("Имя обязательно")
            .trim()
            .regex(/^[-A-Za-zА-Яа-яёЁ]+$/, {
                error: "Имя должно содержать только буквы",
            })
            .min(1, { error: "Не менее 1 символа" }),
        surname: z
            .string("Фамилия обязательна")
            .trim()
            .regex(/^[-A-Za-zА-Яа-яёЁ]+$/, {
                error: "Фамилия должна содержать только буквы",
            })
            .min(1, { error: "Не менее 1 символа" }),
        patronymic: z.string("Отчество должно быть строкой").optional(),
        email: z.email("Некорректный email"),
        password: z.string("Пароль обязателен").min(8, "Не менее 8 символов"),
        confirmPassword: z
            .string("Пароль обязателен")
            .min(8, "Не менее 8 символов"),
        isTeacher: z.boolean().default(false),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: "Пароли должны совпадать",
    });

type Schema = z.output<typeof formSchema>;

const formState = reactive<Partial<Schema>>({
    name: undefined,
    surname: undefined,
    patronymic: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    isTeacher: false,
});

async function register(): Promise<void> {
    await $fetch("/api/auth/register", {
        method: "POST",
        body: {
            name: formState.name,
            surname: formState.surname,
            patronymic: formState.patronymic,
            email: formState.email,
            password: formState.password,
            isTeacher: formState.isTeacher,
        },
    });

    const { fetch } = useUserSession();
    await fetch();

    await navigateTo("/profile");
}

async function onSubmit(): Promise<void> {
    try {
        await register();
    } catch (e: unknown) {
        handleError(e as Error);
    }
}
</script>
