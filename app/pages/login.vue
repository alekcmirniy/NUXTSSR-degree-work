<template>
    <div class="container">
        <div class="flex flex-col">
            <div class="text-center">
                {{ currentForm === "login" ? "Вход" : "Регистрация" }}
            </div>
            <br />
        </div>
        <div class="h-full">
            <LoginForm v-if="currentForm === 'login'" />
            <RegisterForm v-else />
        </div>

        <div>
            <p>Уже есть аккаунт?</p>
            <div class="switch-form-link" @click="setForm('login')">Вход</div>
        </div>

        <div class="switch-form-link" @click="setForm('register')">
            Регистрация
        </div>
    </div>
</template>

<script setup lang="ts">
type AvailableForm = "login" | "register";

const currentForm = ref<AvailableForm>("register");

function setForm(newVal: AvailableForm): void {
    if (currentForm.value === newVal) return;
    currentForm.value = newVal;
}
</script>

<style lang="scss" scoped>
.switch-form-link {
    @apply cursor-pointer;
    @apply hover:text-yellow-100 transition-colors;
}
</style>
