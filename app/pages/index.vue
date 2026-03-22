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

const { fetchData, setData } = axiosStore;

const fetchVKPosts = async () => await $fetch("/api/vk");

onMounted(async () => {
    const { items }: PostsRequest = await fetchData("posts", fetchVKPosts);
    setData("posts", items);
});
</script>
