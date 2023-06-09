<template>
    <div class="inf-list-words">
        <VCard
            v-for="item in wordSet?.words"
            class="inf-list-words__word"
            :img="item.img"
            :title="item.word"
            :subtitle="item.translation"
        />
    </div>
</template>

<script setup lang="ts">
    import VCard from "@components/VCard.vue";
    import api from "/src/api";
    import type { IWordSet, WordSetJson } from "@types";
    import { ref } from "vue";
    import { useRoute } from "vue-router";

    const wordSet = ref<IWordSet>();

    const route = useRoute();

    fetch(`${api.wordset}?id=${route.params.wordSetId}&full=true`)
        .then((res) => res.json())
        .then((res: WordSetJson) => {
            if (res.status) {
                wordSet.value = res.data;
            }
        });
</script>

<style scoped lang="scss">
    .inf-list-words {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
        gap: 20px;

        &__word {
            width: auto;
            height: auto;
        }
    }
</style>
