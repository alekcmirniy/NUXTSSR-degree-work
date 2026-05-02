<template>
    <UForm
        :state="formState"
        :schema="formSchema"
        class="default-form"
        @submit="onSubmit"
    >
        <UFormField label="Почта" name="email">
            <UInput v-model="formState.email" type="email" />
        </UFormField>
        <UFormField label="Пароль" name="password">
            <UInput v-model="formState.password" type="password" />
        </UFormField>
        <UButton type="submit">Войти</UButton>
    </UForm>
</template>

<script lang="ts" setup>
import * as z from "zod";

const { handleError } = useHandleError();

const formSchema = z.object({
    email: z.email("Некорректный email"),
    password: z.string("Пароль обязателен"),
});

type schema = z.output<typeof formSchema>;

const formState = reactive<Partial<schema>>({
    email: undefined,
    password: undefined,
});

async function onSubmit() {
    try {
        await login();
    } catch (e: unknown) {
        handleError(e as Error);
    }
}

async function login(): Promise<void> {
    try {
        await $fetch("/api/auth/login", {
            method: "POST",
            body: {
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
</script>
