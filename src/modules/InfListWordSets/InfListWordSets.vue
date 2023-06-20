<template>
    <div>
        <Container :status="fetchStatus">
            <div class="inf-list-wordsets">
                <CardLink
                    v-for="wordSet in wordSets"
                    class="inf-list-wordsets__word"
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
        </Container>
    </div>
</template>

<script setup lang="ts">
    import CardLink from "@components/CardLink.vue";
    import api from "/src/api";
    import type { IWordSet } from "@types";
    import { useGeneralStore } from "@stores/storeGeneral";
    import useFetch from "@composables/useFetch";
    import { watch } from "vue";

    const genStore = useGeneralStore();

    const { fetchedData, fetchStatus, fetchMessage } = useFetch<IWordSet[]>({
        url: api.wordsets,
    });

    const wordSets = fetchedData;

    watch(wordSets, () => {
        if (wordSets.value) {
            genStore.cacheWordSets(wordSets.value);
        }
    });
</script>

<style scoped lang="scss">
    .inf-list-wordsets {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 20px;

        &__word {
            width: auto;
            height: auto;
        }
    }
</style>
