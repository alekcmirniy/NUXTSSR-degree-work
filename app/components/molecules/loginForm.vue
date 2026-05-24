<!-- components/LoginForm.vue -->
<template>
    <UForm
        :state="formState"
        :schema="formSchema"
        class="default-form space-y-5"
        @submit="onSubmit"
    >
        <UFormField label="Почта" name="email">
            <UInput
                v-model="formState.email"
                type="email"
                autocomplete="email"
                placeholder="name@example.com"
                class="w-full"
            />
        </UFormField>

        <UFormField label="Пароль" name="password">
            <UInput
                v-model="formState.password"
                type="password"
                autocomplete="current-password"
                placeholder="Введите пароль"
                class="w-full"
            />
        </UFormField>

        <UButton
            type="submit"
            color="primary"
            size="lg"
            block
            class="ui-btn ui-btn-secondary"
        >
            Войти
        </UButton>
    </UForm>
</template>

<script lang="ts" setup>
import * as z from "zod";

const { handleError } = useHandleError();

const formSchema = z.object({
    email: z.email("Некорректный email"),
    password: z.string("Пароль обязателен").min(1, "Пароль обязателен"),
});

type Schema = z.output<typeof formSchema>;

const formState = reactive<Partial<Schema>>({
    email: undefined,
    password: undefined,
});

async function login(): Promise<void> {
    await $fetch("/api/auth/login", {
        method: "POST",
        body: {
            email: formState.email,
            password: formState.password,
        },
    });

    const { fetch } = useUserSession();
    await fetch();

    await navigateTo("/profile");
}

async function onSubmit(): Promise<void> {
    try {
        await login();
    } catch (e: unknown) {
        handleError(e as Error);
    }
}
</script>
