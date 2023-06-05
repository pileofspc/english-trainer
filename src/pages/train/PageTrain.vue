<template>
    <LayoutDefault>
        <component
            class="page-train__trainer"
            :is="chosenVariant.component"
            :trainingType="route.params.trainingType"
            :trainerData="trainerData"
        />
    </LayoutDefault>
</template>

<script setup lang="ts">
    import LayoutDefault from "@components/LayoutDefault.vue";
    import TrainerRightWrong from "@modules/TrainerRightWrong/TrainerRightWrong.vue";
    import TrainerWithOptions from '@modules/TrainerWithOptions/TrainerWithOptions.vue';
    import type { IBreadcrumbItem, TrainingType, ITrainMap, Res, TrainerJson, TrainerData } from "@types";
    import { computed, ref, watch } from "vue";
    import { useRoute } from "vue-router";
    import apis from '/src/api';
    import { useBreadcrumbsStore } from "/src/stores/storeBreadcrumbs";

    const route = useRoute();

    let varMap: ITrainMap = {
        'train': {
            component: TrainerRightWrong,
            displayName: 'Верно не верно'
        },
        'train-en-ru': {
            component: TrainerWithOptions,
            displayName: 'C английского на русский'
        },
        'train-ru-en': {
            component: TrainerWithOptions,
            displayName: 'С русского на английский'
        }
    }

    const chosenVariant = varMap[route.params.trainingType as TrainingType];

    const bcstore = useBreadcrumbsStore();
    const displayName = ref('');
    const breadCrumbs = computed<IBreadcrumbItem[]>(() => [
        { 
            displayName: 'Главная', 
            to: { 
                name: 'PageMain', 
                replace: true 
            } 
        },
        { 
            displayName: 'Наборы слов', 
            to: { 
                name: 'PageWordSets', 
                replace: true 
            } 
        },
        {
            displayName: displayName.value,
            to: {
                name: 'PageWordSet',
                params: {
                    wordSetId: route.params.wordSetId
                }
            }
        },
        {
            displayName: chosenVariant.displayName
        }
    ])

    watch(breadCrumbs, () => {
        bcstore.breadcrumbs = breadCrumbs.value
    })

    const trainerData = ref<TrainerData>([]);

    fetch(apis[route.params.trainingType as TrainingType] + '?id=' + route.params.wordSetId)
    .then(res => res.json())
    .then((json: Res<TrainerJson>) => {
        displayName.value = json.data.wordSet.title
        trainerData.value = json.data.trainerData
    })
</script>

<style lang="scss" scoped></style>