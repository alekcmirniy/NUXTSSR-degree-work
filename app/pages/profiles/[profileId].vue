<template>
    {{ profileId }}
</template>

<script lang="ts" setup>
const routeParams = useRoute();
const profileId = routeParams.params.profileId;

//тут будет мидлвара на запрос пользователя. если такого нет - ошибка.
</script>
