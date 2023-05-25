<template>
    <LayoutDefault>
        <component
            class="page-train__trainer"
            :is="chosenVariant.component"
            v-bind="chosenVariant.from && { from: chosenVariant.from }"
        />
    </LayoutDefault>
</template>

<script setup>
    import { useRoute } from "vue-router";

    import LayoutDefault from "@components/LayoutDefault.vue";
    import TrainerWithOptions from '@modules/TrainerWithOptions/TrainerWithOptions.vue';
    import TrainerRightWrong from "@modules/TrainerRightWrong/TrainerRightWrong.vue";

    const route = useRoute();

    const variantMap = new Map();
    variantMap.set('train', { component: TrainerRightWrong });
    variantMap.set('train-eng-rus', { component: TrainerWithOptions, from: 'eng' });
    variantMap.set('train-rus-eng', { component: TrainerWithOptions, from: 'rus' });

    let chosenVariant = variantMap.get(route.params.trainingType);
</script>

<style lang="scss" scoped></style>