<template>
    <LayoutDefault>
        <ThemeHeader :theme="theme"></ThemeHeader>
        <SliderThemes></SliderThemes>
    </LayoutDefault>
</template>

<script setup>
    import LayoutDefault from '@components/LayoutDefault/LayoutDefault.vue';
    import SliderThemes from "@modules/SliderThemes/SliderThemes.vue";
    import ThemeHeader from "@modules/ThemeHeader/ThemeHeader.vue";

    let theme = {
        route: 'hello',
        imgPath: '/static/cat_640x640.jpg',
        title: 'Животные 111',
        description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
    }
</script>

<style lang="scss"></style>