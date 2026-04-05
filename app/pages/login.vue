<template>
    <div>Вход</div>
    <form class="flex flex-col gap-4 justify-center items-center">
        <label for="email">Почта</label>
        <input name="email" v-model="email" />

        <label for="password">Пароль</label>
        <input name="password" v-model="password" />

        <button @click="login">Войти</button>
    </form>
</template>

<script setup>
const email = ref("");
const password = ref("");
const error = ref("");

const login = async () => {
    try {
        await $fetch("/api/auth/login", {
            method: "POST",
            body: {
                email: email.value,
                password: password.value,
            },
        });

        navigateTo("/");
    } catch {
        error.value = "Ошибка входа";
    }
};
</script>

<style lang="scss" scoped></style>
