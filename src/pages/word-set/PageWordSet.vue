<template>
    <LayoutDefault>
        <Container
            :status="cachedWordset ? FetchStatuses.Ready : fetchStatus"
            redirect
        >
            <WordSetHeader v-bind="wordsetHeaderData" />
        </Container>

        <TrainLinks class="page-theme__train-links" />
        <InfListWords class="page-theme__words" />
    </LayoutDefault>
</template>

<script setup lang="ts">
    import LayoutDefault from "@components/LayoutDefault.vue";
    import InfListWords from "@modules/InfListWords/InfListWords.vue";
    import TrainLinks from "@modules/TrainLinks/TrainLinks.vue";
    import WordSetHeader from "@modules/WordSetHeader/WordSetHeader.vue";

    import type { IWordSet } from "@types";
    import { computed, watch } from "vue";
    import { useRoute } from "vue-router";
    import useFetch from "@composables/useFetch";
    import api from "/src/api";
    import { useGeneralStore } from "/src/stores/storeGeneral";
    import { FetchStatuses } from "/src/FetchStatuses";
    import useBreadcrumbs from "/src/composables/useBreadcrumbs";

    const genStore = useGeneralStore();
    const route = useRoute();

    const wordSetId =
        typeof route.params.wordSetId === "string"
            ? route.params.wordSetId
            : route.params.wordSetId[0];

    const { fetchedData, fetchStatus } = useFetch<IWordSet>({
        url: `${api.wordset}?id=${wordSetId}`,
    });

    const wordSet = fetchedData;

    const cachedWordset = genStore.getFromCache(wordSetId);
    watch(wordSet, () => {
        if (wordSet.value) {
            genStore.cacheWordSets([wordSet.value]);
        }
    });

    const wordsetHeaderData = computed(() => {
        if (wordSet.value) {
            return {
                img: wordSet.value.img,
                title: wordSet.value.title,
                description: wordSet.value.description,
            };
        }
        if (cachedWordset) {
            return {
                img: cachedWordset.img,
                title: cachedWordset.title,
                description: cachedWordset.description,
            };
        }
    });

    useBreadcrumbs(() => [
        { displayName: "Главная", to: { name: "PageMain", replace: true } },
        {
            displayName: "Наборы слов",
            to: { name: "PageWordSets", replace: true },
        },
        {
            displayName:
                wordSet.value?.title ||
                genStore.getFromCache(wordSetId)?.title ||
                "Текущий набор",
        },
    ]);
</script>

<style scoped lang="scss">
    .page-theme {
        &__words {
            margin-top: var(--mt-big);
        }

        &__train-links {
            margin-top: var(--mt-big);
        }
    }
</style>
