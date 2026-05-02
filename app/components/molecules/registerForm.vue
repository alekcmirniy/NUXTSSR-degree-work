<template>
    <UForm
        :validate-on="['input']"
        :state="formState"
        :schema="formSchema"
        class="default-form"
        @submit="onSubmit"
    >
        <UFormField label="Фамилия" name="surname">
            <UInput v-model="formState.surname" type="text" />
        </UFormField>
        <UFormField label="Имя" name="name">
            <UInput v-model="formState.name" type="text" />
        </UFormField>
        <UFormField label="Отчество" name="patronymic">
            <UInput v-model="formState.patronymic" type="text" />
        </UFormField>
        <UFormField label="Почта" name="email">
            <UInput v-model="formState.email" type="email" />
        </UFormField>
        <UFormField label="Пароль" name="password">
            <UInput v-model="formState.password" type="password" />
        </UFormField>
        <UFormField label="Повторите пароль" name="confirmPassword">
            <UInput v-model="formState.confirmPassword" type="password" />
        </UFormField>
        <UButton type="submit">Зарегистрироваться</UButton>
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
            .regex(/^[-A-Za-zА-Яа-яёЁ]+$/, {
                error: "Фамилия должна содержать только буквы",
            })
            .trim()
            .min(1, { error: "Не менее 1 символа" }),
        patronymic: z.string("Отчество должно быть строкой").optional(),
        email: z.email("Некорректный email"),
        password: z.string("Пароль обязателен").min(8, "Не менее 8 символов"),
        confirmPassword: z
            .string("Пароль обязателен")
            .min(8, "Не менее 8 символов"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: "Пароли должны совпадать",
    });

type schema = z.output<typeof formSchema>;

const formState = reactive<Partial<schema>>({
    name: undefined,
    surname: undefined,
    patronymic: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
});

async function register(): Promise<void> {
    try {
        await $fetch("/api/auth/register", {
            method: "POST",
            body: {
                name: formState.name,
                surname: formState.surname,
                patronymic: formState.patronymic,
                email: formState.email,
                password: formState.password,
            },
        });

        const { fetch } = useUserSession();
        await fetch();

        navigateTo("/profile");
    } catch (e: unknown) {
        console.error(e);
    }
}

async function onSubmit(): Promise<void> {
    try {
        await register();
    } catch (e: unknown) {
        handleError(e as Error);
    }
}
</script>
