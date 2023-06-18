<template>
    <LayoutDefault>
        <Container
            :status="cachedWordset ? FetchStatuses.Ready : fetchStatus"
            redirect
        >
            <WordSetHeader v-bind="wordSet || cachedWordset" />
        </Container>

        <TrainLinks class="page-theme__train-links" />
        <Container :status="fetchStatus" redirect>
            <InfListWords class="page-theme__words" :items="cardItems" />
        </Container>
    </LayoutDefault>
</template>

<script setup lang="ts">
    import LayoutDefault from "@components/LayoutDefault.vue";
    import InfListWords from "@modules/InfListWords/InfListWords.vue";
    import TrainLinks from "@modules/TrainLinks/TrainLinks.vue";
    import WordSetHeader from "@modules/WordSetHeader/WordSetHeader.vue";

    import { useBreadcrumbsStore } from "@stores/storeBreadcrumbs";
    import type { IBreadcrumb, IWordSet, IVCard } from "@types";
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
        api: `${api.wordset}?id=${wordSetId}`,
    });

    const wordSet = fetchedData;

    const cachedWordset = genStore.getFromCache(wordSetId);
    watch(wordSet, () => {
        if (wordSet.value) {
            genStore.cacheWordSets([wordSet.value]);
        }
    });

    const cardItems = computed<IVCard[]>(() => {
        return (
            wordSet.value?.words?.map((word) => ({
                img: word.img,
                title: word.word,
                subtitle: word.translation,
            })) || []
        );
    });

    useBreadcrumbs([
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
