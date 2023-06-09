<template>
    <div class="inf-list-words">
        <CardLink
            v-for="wordSet in wordSets"
            class="inf-list-words__word"
            :img="wordSet.img"
            :title="wordSet.title"
            :short-description="wordSet.shortDescription"
            :link="{
                name: 'PageWordSet',
                params: {
                    wordSetId: wordSet.id,
                },
            }"
        />
    </div>
</template>

<script setup lang="ts">
    import CardLink from "@components/CardLink.vue";
    import api from "/src/api";
    import type { IWordSet, WordSetsJson } from "@types";
    import { ref } from "vue";

    const wordSets = ref<IWordSet[]>([]);

    fetch(api.wordsets)
        .then((res) => res.json())
        .then((res: WordSetsJson) => {
            if (res.status) {
                wordSets.value = res.data;
            }
        });
</script>

<style scoped lang="scss">
    .inf-list-words {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 20px;

        &__word {
            width: auto;
            height: auto;
        }
    }
</style>
