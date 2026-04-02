<template>
    <div class="flex items-center justify-evenly">
        <div
            v-if="!isLoading"
            class="border-solid border-black border-[2px] h-[1000px] w-[60vw]"
        >
            {{ error }}
            {{ posts }}
        </div>
        <div v-else>Loading Posts</div>
    </div>
</template>

<script setup lang="ts">
import { useAxiosStore } from "#imports";
import type { PostsRequest } from "~/utils/interfaces/posts";

const axiosStore = useAxiosStore();
const { isLoading, posts, error } = storeToRefs(axiosStore);

const { setData } = axiosStore;

const { data, error: fetchError, status } = await useFetch("/api/vk"); //реализовать с кешированием

if (data.value) {
    setData("posts", data.value.response.items);
}
</script>
