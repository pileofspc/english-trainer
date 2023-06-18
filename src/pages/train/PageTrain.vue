<template>
    <LayoutDefault>
        <component
            class="page-train__trainer"
            :is="chosenVariant.component"
            :trainingType="route.params.trainingType"
            :wordSetId="route.params.wordSetId"
        />
    </LayoutDefault>
</template>

<script lang="ts">
    import type { ITrainMap, IWordSet, TrainingType } from "@types";
    import useFetch from "/src/composables/useFetch";
    import useBreadcrumbs from "/src/composables/useBreadcrumbs";
    import { useGeneralStore } from "/src/stores/storeGeneral";
</script>

<script setup lang="ts">
    import LayoutDefault from "@components/LayoutDefault.vue";
    import TrainerRightWrong from "@modules/TrainerRightWrong/TrainerRightWrong.vue";
    import TrainerWithOptions from "@modules/TrainerWithOptions/TrainerWithOptions.vue";
    import { useRoute } from "vue-router";
    import apis from "/src/api";

    const genStore = useGeneralStore();
    const route = useRoute();

    const wordSetId =
        typeof route.params.wordSetId === "string"
            ? route.params.wordSetId
            : route.params.wordSetId[0];

    const { fetchedData, fetchStatus } = useFetch<IWordSet>({
        api: `${apis.wordset}?id=${wordSetId}`,
    });

    const wordSet = fetchedData;

    let varMap: ITrainMap = {
        train: {
            component: TrainerRightWrong,
            displayName: "Верно не верно",
        },
        "train-en-ru": {
            component: TrainerWithOptions,
            displayName: "C английского на русский",
        },
        "train-ru-en": {
            component: TrainerWithOptions,
            displayName: "С русского на английский",
        },
    };

    const chosenVariant = varMap[route.params.trainingType as TrainingType];

    useBreadcrumbs([
        {
            displayName: "Главная",
            to: {
                name: "PageMain",
                replace: true,
            },
        },
        {
            displayName: "Наборы слов",
            to: {
                name: "PageWordSets",
                replace: true,
            },
        },
        {
            displayName:
                wordSet.value?.title ||
                genStore.getFromCache(wordSetId)?.title ||
                "Тренажер",
            to: {
                name: "PageWordSet",
                params: {
                    wordSetId: wordSetId,
                },
            },
        },
        {
            displayName: chosenVariant.displayName,
        },
    ]);
</script>

<style lang="scss" scoped></style>
