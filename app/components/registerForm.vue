<template>
    <UForm :state="formState" :schema="formSchema" class="default-form">
        <UFormField label="Почта" name="email">
            <UInput v-model="formState.email" />
        </UFormField>
        <UFormField label="Пароль" name="password">
            <UInput v-model="formState.password" />
        </UFormField>
        <UButton @click="validate">Зарегистрироваться</UButton>
    </UForm>
</template>

<script lang="ts" setup>
import * as z from "zod";

const { handleError } = useHandleError();

const formSchema = z.object({
    email: z.email("Некорректный email"),
    password: z.string("Пароль обязателен").min(8, "Не менее 8 символов"),
});

type schema = z.output<typeof formSchema>;

const formState = reactive<Partial<schema>>({
    email: undefined,
    password: undefined,
});

async function validate() {
    try {
        if (formState.email?.length && formState.password?.length) {
            await register();
        } else throw new Error("Форма регистрации не заполнена!");
    } catch (e: unknown) {
        handleError(e as Error);
    }
}
const register = async () => {
    try {
        await $fetch("/api/auth/register", {
            method: "POST",
            body: {
                email: formState.email,
                password: formState.password,
            },
        });

        navigateTo("/profile");
    } catch (e: unknown) {
        console.error(e);
    }
};
</script>
