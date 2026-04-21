<template>
    <UForm
        :state="formState"
        :schema="formSchema(formState.password)"
        class="default-form"
    >
        <UFormField label="Почта" name="email">
            <UInput v-model="formState.email" type="email" />
        </UFormField>
        <UFormField label="Пароль" name="password">
            <UInput v-model="formState.password" type="password" />
        </UFormField>
        <UFormField label="Повторите пароль" name="confirmPassword">
            <UInput v-model="formState.confirmPassword" type="password" />
        </UFormField>
        <UButton @click="validate" type="submit">Зарегистрироваться</UButton>
    </UForm>
</template>

<script lang="ts" setup>
import * as z from "zod";

const { handleError } = useHandleError();

function formSchema(psw?: string) {
    return z.object({
        email: z.email("Некорректный email"),
        password: z.string("Пароль обязателен").min(8, "Не менее 8 символов"),
        confirmPassword: z
            .string("Пароль обязателен")
            .min(8, "Не менее 8 символов")
            .refine((val) => val === psw, { error: "Пароли должны совпадать" }),
    });
}

type FormSchemaType = ReturnType<typeof formSchema>;
type schema = z.output<FormSchemaType>;

const formState = reactive<Partial<schema>>({
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
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

        const { fetch } = useUserSession();
        await fetch();

        navigateTo("/profile");
    } catch (e: unknown) {
        console.error(e);
    }
};
</script>
