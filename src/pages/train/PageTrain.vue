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
    import type {
        IBreadcrumb,
        ITrainMap,
        IWordSet,
        TrainingType,
        WordSetJson,
    } from "@types";
    import useFetch from "/src/composables/useFetch";
</script>

<script setup lang="ts">
    import LayoutDefault from "@components/LayoutDefault.vue";
    import TrainerRightWrong from "@modules/TrainerRightWrong/TrainerRightWrong.vue";
    import TrainerWithOptions from "@modules/TrainerWithOptions/TrainerWithOptions.vue";
    import { computed, watch } from "vue";
    import { useRoute } from "vue-router";
    import apis from "/src/api";
    import { useBreadcrumbsStore } from "@stores/storeBreadcrumbs";

    const route = useRoute();

    const { fetchedData, fetchStatus } = useFetch<IWordSet>({
        api: `${apis.wordset}?id=${route.params.wordSetId}`,
    });

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

    const bcstore = useBreadcrumbsStore();
    const displayName = computed(() => {
        return fetchedData.value?.title || "";
    });
    const breadCrumbs = computed<IBreadcrumb[]>(() => [
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
            displayName: displayName.value,
            to: {
                name: "PageWordSet",
                params: {
                    wordSetId: route.params.wordSetId,
                },
            },
        },
        {
            displayName: chosenVariant.displayName,
        },
    ]);

    bcstore.breadcrumbs = breadCrumbs.value;
    watch(breadCrumbs, () => {
        bcstore.breadcrumbs = breadCrumbs.value;
    });

    // fetch(`${apis.wordset}?id=${route.params.wordSetId}`)
    //     .then((res) => res.json())
    //     .then((json: WordSetJson) => {
    //         displayName.value = json.data.title;
    //     });
</script>

<style lang="scss" scoped></style>
