<template>
    <div class="inf-list-words">
        <Container :status="fetchStatus">
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
        </Container>
    </div>
</template>

<script setup lang="ts">
    import CardLink from "@components/CardLink.vue";
    import api from "/src/api";
    import type { IWordSet } from "@types";
    import { useGeneralStore } from "@stores/storeGeneral";
    import useFetch from "/src/composables/useFetch";
    import { watch } from "vue";

    const genStore = useGeneralStore();

    const { fetchedData, fetchStatus, fetchMessage } = useFetch<IWordSet[]>({
        api: api.wordsets,
    });

    const wordSets = fetchedData;

    watch(wordSets, () => {
        if (wordSets.value) {
            genStore.cacheWordSets(wordSets.value);
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
