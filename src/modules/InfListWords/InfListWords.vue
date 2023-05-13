<template>
    <div class="inf-list-words">
        <CardWord class="inf-list-words__word"
                  v-for="word in words"
                  v-bind="word"
        ></CardWord>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import CardWord from '@modules/CardWord/CardWord.vue';

    let words = ref(
        [
            {
                imgPath: '/static/sport1.jpg',
                word: 'Hello',
                translation: 'Привет'
            },
            {
                imgPath: '/static/sport1.jpg',
                word: 'Hello',
                translation: 'Привет'
            },
            {
                imgPath: '/static/sport1.jpg',
                word: 'Hello',
                translation: 'Привет'
            },
            {
                imgPath: '/static/sport1.jpg',
                word: 'Hello',
                translation: 'Привет'
            },
            {
                imgPath: '/static/sport1.jpg',
                word: 'Hello',
                translation: 'Привет'
            },
            {
                imgPath: '/static/sport1.jpg',
                word: 'Hello',
                translation: 'Привет'
            },
            {
                imgPath: '/static/sport1.jpg',
                word: 'Hello',
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