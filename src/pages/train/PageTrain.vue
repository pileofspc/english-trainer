<template>
    <LayoutDefault>
        <component
            :is="variantMap.get(route.params.trainingType)"
            class="page-train__trainer"
        />
    </LayoutDefault>
</template>

<script setup>
    import {useRoute} from "vue-router";

    import LayoutDefault from "@components/LayoutDefault.vue";
    import TrainerWithOptions from '@modules/TrainerWithOptions/TrainerWithOptions.vue';
    import TrainerRightWrong from "@modules/TrainerRightWrong/TrainerRightWrong.vue";

    const route = useRoute();

    const variantMap = new Map();
    variantMap.set('train', TrainerRightWrong);
    variantMap.set('train-eng-rus', TrainerWithOptions);
    variantMap.set('train-rus-eng', TrainerWithOptions);
</script>

<style lang="scss" scoped></style>