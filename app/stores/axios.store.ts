import { defineStore, acceptHMRUpdate } from "pinia";
import { computed, ref } from "vue";

const results = ref<Record<string, any>>({});
const isLoading = ref<boolean>(false);
const error = ref<null | string>(null);

export const useAxiosStore = defineStore("axios", () => {
    const fetchData = async (key: string, cb: () => Promise<any>) => {
        try {
            // if (results.value.has(newVal) && Object.keys(results.value[newVal]!).length)
            //     return dataMap.value.get(newVal) || {};

            isLoading.value = true;
            error.value = null;
            const res = await cb();
            if (!res.data) throw new Error("Response data is empty");
            return res.data;
        } catch (e: any) {
            error.value = e;
            console.error("Ошибка: " + e.message);
            return {};
        } finally {
            isLoading.value = false;
        }
    };
    const setData = (key: string, newData: {}) =>
        (results.value[key] = newData);

    const posts = computed(() => results.value["posts"]);

    return { fetchData, setData, results, isLoading, error, posts };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAxiosStore, import.meta.hot));
}
