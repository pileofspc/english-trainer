<template>
    <LayoutDefault>
        <WordSetHeader v-bind="wordSet" />
        <TrainLinks class="page-theme__train-links" />
        <InfListWords class="page-theme__words" />
    </LayoutDefault>
</template>

<script setup>
    import { useRoute } from "vue-router";

    import LayoutDefault from '@components/LayoutDefault.vue';
    import WordSetHeader from '@modules/WordSetHeader/WordSetHeader.vue';
    import InfListWords from '@modules/InfListWords/InfListWords.vue';
    import TrainLinks from "@modules/TrainLinks/TrainLinks.vue";

    const route = useRoute();

    let wordSet = {
        themeId: 'hello',
        imgPath: '/static/cat_640x640.jpg',
        title: 'Животные 111',
        description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
    }
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