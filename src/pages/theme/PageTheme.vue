<template>
    <LayoutDefault>
        <ThemeHeader v-bind="theme"></ThemeHeader>
        <InfListWords class="page-theme__words"></InfListWords>
    </LayoutDefault>
</template>

<script setup>
    import { useRoute } from "vue-router";

    import ThemeHeader from '@modules/ThemeHeader/ThemeHeader.vue';
    import InfListWords from '@modules/InfListWords/InfListWords.vue';

    const route = useRoute();
    console.log(route.params.themeId)

    let theme = {
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
    }
</style>