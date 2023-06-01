<template>
    <LayoutDefault>
        <Breadcrumbs :items="breadCrumbs"></Breadcrumbs>
        <component
            class="page-train__trainer"
            :is="chosenVariant.component"
            v-bind="chosenVariant.from && { from: chosenVariant.from }"
        />
    </LayoutDefault>
</template>

<script setup lang="ts">
    import { useRoute } from "vue-router";
    import { computed } from "vue";

    import LayoutDefault from "@components/LayoutDefault.vue";
    import TrainerWithOptions from '@modules/TrainerWithOptions/TrainerWithOptions.vue';
    import TrainerRightWrong from "@modules/TrainerRightWrong/TrainerRightWrong.vue";
    import Breadcrumbs from '@components/Breadcrumbs.vue';

    const route = useRoute();

    const variantMap = new Map();
    variantMap.set('train', {
        component: TrainerRightWrong,
        displayName: 'Верно не верно'
    });
    variantMap.set('train-eng-rus', {
        component: TrainerWithOptions,
        from: 'eng',
        displayName: 'C английского на русский'
    });
    variantMap.set('train-rus-eng', {
        component: TrainerWithOptions,
        from: 'rus',
        displayName: 'С русского на английский'
    });

    const chosenVariant = variantMap.get(route.params.trainingType);

    const breadCrumbs = computed(() => [
        {
            displayName: 'Главная',
            to: 'PageMain'
        },
        {
            displayName: 'Набор слов',
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
</script>

<style lang="scss" scoped></style>