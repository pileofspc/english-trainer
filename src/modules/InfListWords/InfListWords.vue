<template>
    <div class="inf-list-words">
        <CardWord class="inf-list-words__word" v-for="index in 50"></CardWord>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import CardWord from '@modules/CardWord/CardWord.vue';

    let words = ref(
        [
            {
                word: 'Hello',
                imgPath: '/static/sport1.jpg',
                translation: 'Привет'
            },
            {
                word: 'Hello',
                imgPath: '/static/sport1.jpg',
                translation: 'Привет'
            },
            {
                word: 'Hello',
                imgPath: '/static/sport1.jpg',
                translation: 'Привет'
            },
            {
                word: 'Hello',
                imgPath: '/static/sport1.jpg',
                translation: 'Привет'
            },
            {
                word: 'Hello',
                imgPath: '/static/sport1.jpg',
                translation: 'Привет'
            },
            {
                word: 'Hello',
                imgPath: '/static/sport1.jpg',
                translation: 'Привет'
            },
            {
                word: 'Hello',
                imgPath: '/static/sport1.jpg',
                translation: 'Привет'
            },
        ]
    );
</script>

<style scoped lang="scss">
    .inf-list-words {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 16px;

        &__word {
            width: auto;
            height: auto;
        }
    }
</style>