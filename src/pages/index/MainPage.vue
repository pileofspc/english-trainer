<template>
    <LayoutDefault>
        <SliderCards :slider-items="sliderItems"></SliderCards>
    </LayoutDefault>
</template>

<script setup>
    import {ref} from "vue";

    import LayoutDefault from '@components/LayoutDefault/LayoutDefault.vue';
    import SliderCards from '@modules/SliderCards/SliderCards.vue';

    let sliderItems = ref([
        {
            route: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            route: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            route: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            route: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        }
    ]);
</script>

<style lang="scss"></style>