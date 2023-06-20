import type { Res } from "@types";
import type { Ref } from "vue";
import { ref } from "vue";
import { FetchStatuses } from "/src/FetchStatuses";
import { random } from "lodash";

export default function useFetch<T>(options?: {
    defaultValue?: undefined;
    url?: string;
    stagger?: boolean;
    fetchOptions?: any;
}): {
    fetchedData: Ref<T | undefined>;
    fetchStatus: Ref<FetchStatuses>;
    fetchMessage: Ref<string>;
    isFetching: Ref<boolean>;
    startFetch: Function;
};

export default function useFetch<T>(options?: {
    defaultValue: T;
    url?: string;
    stagger?: boolean;
    fetchOptions?: any;
}): {
    fetchedData: Ref<T>;
    fetchStatus: Ref<FetchStatuses>;
    fetchMessage: Ref<string>;
    isFetching: Ref<boolean>;
    startFetch: Function;
};

export default function useFetch<T>({
    url,
    stagger = false,
    defaultValue,
    fetchOptions,
}: {
    url?: string;
    stagger?: boolean;
    defaultValue?: T;
    fetchOptions?: any;
} = {}) {
    const fetchedData = ref(defaultValue) as Ref<T | undefined>;
    const fetchStatus = ref(FetchStatuses.NotStarted);
    const isFetching = ref(true);
    const fetchMessage = ref("");

    const randomTime = Math.random() * 5000;
    // const randomTime = 9999999;

    function startFetch(
        urlOverride: string,
        fetchOptionsOverride: any = fetchOptions
    ) {
        fetchStatus.value = FetchStatuses.Fetching;
        setTimeout(() => {
            fetch(urlOverride, fetchOptionsOverride)
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

    if (!stagger && url) {
        startFetch(url, fetchOptions);
    }

    return {
        fetchStatus,
        fetchMessage,
        fetchedData,
        isFetching,
        startFetch,
    };
}
