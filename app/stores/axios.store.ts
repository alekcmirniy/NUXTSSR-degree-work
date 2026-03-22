import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, ref } from "vue";
import type { PostData } from "~/utils/interfaces/posts";

export const useAxiosStore = defineStore("axios", () => {
    const results = ref<Record<string, any>>({});
    const isLoading = ref<boolean>(false);
    const error = ref<null | Error>(null);

    const fetchData = async (key: string, cb: () => Promise<any>) => {
        try {
            // if (results.value.has(newVal) && Object.keys(results.value[newVal]!).length)
            //     return dataMap.value.get(newVal) || {};

            isLoading.value = true;
            error.value = null;
            const res = await cb();
            if (!res.response) throw new Error("Response data is empty");
            return res.response;
        } catch (e: unknown) {
            error.value = e as Error;
            console.error("Ошибка: " + (e as Error).message);
            return {};
        } finally {
            isLoading.value = false;
        }
    };
    const setData = (key: string, newData: {}) =>
        (results.value[key] = newData);

    const posts = computed<PostData[]>(() => results.value["posts"]);

    return { fetchData, setData, results, isLoading, error, posts };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAxiosStore, import.meta.hot));
}
