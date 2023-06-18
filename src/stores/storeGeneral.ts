import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import type { IWordSet } from "/src/types";
import api from "/src/api";
import useFetch from "/src/composables/useFetch";

export const useGeneralStore = defineStore("general", () => {
    // State
    const wordSetsCache = ref<IWordSet[]>([]);

    // setInterval(() => {
    //     console.log(wordSetsCache.value);
    // }, 500);

    // const { fetchedData, fetchMessage, fetchStatus, startFetch } = useFetch<
    //     IWordSet[]
    // >({ stagger: true });

    // const wordSets = fetchedData;
    // const message = fetchMessage;
    // const status = fetchStatus;

    // Getters
    // const getterWordSets = computed(() => wordSets.value);
    // const getterMessage = computed(() => message.value);
    // const getterStatus = computed(() => status.value);
    const getFromCache = computed(() => {
        return (id: string) =>
            wordSetsCache.value.find((wordset) => wordset.id === id);
    });

    // Actions and Mutations
    // function fetchWordSets(count: number) {
    //     startFetch(api.wordsets + count);
    // }

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
            }
        }
    }

    // Watchers
    // watch(getterWordSets, () => {
    //     if (Array.isArray(getterWordSets.value)) {
    //         cacheWordSets(getterWordSets.value);
    //     }
    // });

    return {
        getFromCache,
        cacheWordSets,
    };
});
