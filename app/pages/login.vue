<template></template>

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
