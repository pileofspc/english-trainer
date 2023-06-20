import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { IWordSet } from "/src/types";

export const useGeneralStore = defineStore("general", () => {
    const wordSetsCache = ref<IWordSet[]>([]);

    const getFromCache = computed(() => {
        return (id: string) =>
            wordSetsCache.value.find((wordset) => wordset.id === id);
    });

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

    return {
        getFromCache,
        cacheWordSets,
    };
});
