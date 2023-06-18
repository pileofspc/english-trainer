import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { IWordSet } from "/src/types";
import api from "/src/api";
import useFetch from "/src/composables/useFetch";

export const useGeneralStore = defineStore("general", () => {
    // State
    const wordSetsCache = ref<IWordSet[]>([]);

    const { fetchedData, fetchMessage, fetchStatus, startFetch } = useFetch<
        IWordSet[]
    >({ stagger: true });

    const wordSets = fetchedData;
    const message = fetchMessage;
    const status = fetchStatus;

    // Getters
    const getterWordSets = computed(() => wordSets.value);
    const getterMessage = computed(() => message.value);
    const getterStatus = computed(() => status.value);

    // Actions and Mutations
    function fetchWordSets(count: number) {
        startFetch(api.wordsets + count);
    }

    function cacheWordSets(wordSetArray: IWordSet[]) {
        for (let item of wordSetArray) {
            const found = wordSetsCache.value.find(
                (wordset) => item.id === wordset.id
            );
            if (!found) {
                const valueToPush = {
                    ...item,
                };
                delete valueToPush.words;
                wordSetsCache.value.push(valueToPush);
                return;
            }
        }
    }

    // Watchers
    watch(getterWordSets, () => {
        if (Array.isArray(getterWordSets.value)) {
            cacheWordSets(getterWordSets.value);
        }
    });

    return {
        getterStatus,
        getterMessage,
        getterWordSets,
        fetchWordSets,
        cacheWordSets,
    };
});
