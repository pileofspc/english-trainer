import { defineStore } from "pinia";
import { ref } from "vue";

export const useTrainersStore = defineStore("trainers", () => {
    const wordSetDisplayName = ref();

    return { wordSetDisplayName };
});
