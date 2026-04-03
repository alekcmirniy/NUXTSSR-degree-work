<template>
    <div class="flex items-center justify-evenly">
        <div
            v-if="!pending"
            class="border-solid border-black border-[2px] mx-20"
        >
            {{ error }}
            <br />
            {{ posts }}
        </div>
        <div v-else>Loading Posts</div>
    </div>
</template>

<script setup lang="ts">
import { useAxiosStore } from "#imports";
import type { PostsRequest } from "~/utils/interfaces/posts";

const axiosStore = useAxiosStore();

const { setData } = axiosStore;
const { posts } = storeToRefs(axiosStore);

const hasPosts = computed<boolean>(() => posts.value && posts.value.length > 0);

const { error, pending, execute } = await useFetch("/api/vk", {
    method: "GET",
    immediate: false,

    onResponse: ({ response }) => {
        setData("posts", response._data.response.items as PostsRequest);
    },
    onResponseError: ({ error }) => {
        console.error(error);
    },
});

if (!hasPosts.value) {
    await execute();
}

const refreshPosts = async () => {
    if (!pending.value) {
        await execute();
    }
};
</script>
