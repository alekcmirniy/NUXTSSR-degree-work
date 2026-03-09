import { reactive, watch } from "vue";

const DEFAULT_ERROR_VALUES = {
    name: "",
    message: "",
} as Error;

const errorQueue = reactive<Error[]>([]);
const currentError = reactive<Error>(DEFAULT_ERROR_VALUES);

export const useHandleError = () => {
    const pushErrorInQueue = (error: Error) => {
        errorQueue.push(error);
    };

    const getErrorFromQueue = () => {
        return errorQueue.length > 0
            ? errorQueue.shift()!
            : structuredClone(DEFAULT_ERROR_VALUES);
    };

    const closeError = () => {
        currentError.message = "";
        currentError.name = "";
    };

    watch(
        () => errorQueue.length,
        (newValue) => {
            if (newValue > 0) {
                const error = getErrorFromQueue();
                currentError.name = error.name;
                currentError.message = error.message;
            }
        },
        { deep: true },
    );

    return { currentError, handleError: pushErrorInQueue, closeError };
};
