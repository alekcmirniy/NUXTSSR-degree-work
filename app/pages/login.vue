<template>
    <div class="flex flex-col">
        <div class="text-center">
            {{ currentForm === "login" ? "Вход" : "Регистрация" }}
        </div>
        <br />
    </div>
    <div v-if="currentForm === 'login'">
        <LoginForm />
    </div>
    <div v-else>
        <RegisterForm />
    </div>

    <div>
        <p>Уже есть аккаунт?</p>
        <div class="switch-form-link" @click="setForm('login')">Вход</div>
    </div>

    <div class="switch-form-link" @click="setForm('register')">Регистрация</div>
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
