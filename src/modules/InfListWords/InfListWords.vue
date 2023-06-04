<template>
    <div class="inf-list-words">
        <CardWord class="inf-list-words__word"
                v-for="word in words"
                v-bind="word"
        />
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import CardWord from '@modules/CardWord/CardWord.vue';
    import type { IWordSimple } from "@types";
    import type { PropType } from "vue";

    const props = defineProps({
        wordSetId: String,
        words: {
            type: Array as PropType<IWordSimple[]>,
        }
    })

    // const words = ref(
    //     [
    //         {
    //             imgPath: '/static/sport1.jpg',
    //             word: 'Hello',
    //             translation: 'Привет'
    //         },
    //         {
    //             imgPath: '/static/sport1.jpg',
    //             word: 'Hello',
    //             translation: 'Привет'
    //         },
    //         {
    //             imgPath: '/static/sport1.jpg',
    //             word: 'Hello',
    //             translation: 'Привет'
    //         },
    //         {
    //             imgPath: '/static/sport1.jpg',
    //             word: 'Hello',
    //             translation: 'Привет'
    //         },
    //         {
    //             imgPath: '/static/sport1.jpg',
    //             word: 'Hello',
    //             translation: 'Привет'
    //         },
    //         {
    //             imgPath: '/static/sport1.jpg',
    //             word: 'Hello',
    //             translation: 'Привет'
    //         },
    //         {
    //             imgPath: '/static/sport1.jpg',
    //             word: 'Hello',
    //             translation: 'Привет'
    //         },
    //     ]
    // );

    // const words = ref<IWordSimple[]>([]);

    // fetch(apis.wordset + '?id=' + props.wordSetId)
    // .then((res) => res.json())
    // .then((json: Res<IWordSimple[]>) => {
    //     words.value = json.data
    // })
</script>

<style scoped lang="scss">
    .inf-list-words {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 20px;

        &__word {
            width: auto;
            height: auto;
        }
    }
</style>