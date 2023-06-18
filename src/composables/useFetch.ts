import type { Res } from "@types";
import type { Ref } from "vue";
import { ref } from "vue";
import { FetchStatuses } from "/src/FetchStatuses";
// type?: KeyOfType<Response, Function>;

export default function useFetch<T>({
    api,
    stagger = false,
    defaultValue,
    method,
    body,
}: {
    api?: string;
    defaultValue?: T;
    stagger?: boolean;
    method?: string;
    body?: unknown;
}) {
    const fetchedData = ref(defaultValue) as Ref<T | undefined>;
    const fetchStatus = ref(FetchStatuses.NotStarted);
    const isFetching = ref(true);
    const fetchMessage = ref("");

    const fetchOptions: any = {};
    if (method) {
        fetchOptions.method = method;
    }
    if (body) {
        fetchOptions.body = body;
    }

    const randomTime = Math.random() * 5000;

    function startFetch(apiOverride: string) {
        setTimeout(() => {
            fetch(apiOverride, fetchOptions)
                .then((res) => res.json())
                .then((resOfType: Res<T>) => {
                    if (!resOfType.status) {
                        throw new Error("Произошла ошибка при запросе данных");
                    }

                    fetchMessage.value = resOfType.message;
                    fetchedData.value = resOfType.data;

                    if (
                        Array.isArray(resOfType.data) &&
                        resOfType.data.length === 0
                    ) {
                        fetchStatus.value = FetchStatuses.Empty;
                    } else {
                        fetchStatus.value = FetchStatuses.Ready;
                    }
                })
                .catch((err) => {
                    fetchStatus.value = FetchStatuses.Error;
                    fetchMessage.value = err;
                    console.error(err);
                })
                .finally(() => {
                    isFetching.value = false;
                });
        }, randomTime);
    }

    if (!stagger && api) {
        startFetch(api);
    }

    return {
        fetchStatus,
        fetchMessage,
        fetchedData,
        isFetching,
        startFetch,
    };
}
