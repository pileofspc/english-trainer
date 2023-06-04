<template>
    <div class="word-of-day block">
        <div class="word-of-day__title small-block-title">Слово дня</div>
        <div class="word-of-day__word">{{ `${word} ${transcription}` }}</div>
        <div class="word-of-day__main">
            <Doughnut :items="chartItems"></Doughnut>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Doughnut from '@components/Doughnut.vue';
    import apis from '/src/apis.json';
    import { computed, ref } from 'vue';
    import type { IWord, Res } from '@types';

    const wordData = ref<IWord>();
    const word = computed(() => wordData.value?.word);
    const transcription = computed(() => wordData.value?.transcription);
    const chartItems = computed(
        () => wordData.value?.translations.map((item) => ({ name: item.translation, value: item.frequency })) || []
    );


    fetch(apis.wordofday)
    .then((res) => res.json())
    .then((json: Res<IWord>) => {
        wordData.value = json.data;
    });

</script>

<style lang="scss" scoped>
    .word-of-day {
        padding: 12px 20px;
        width: fit-content;

        &__title {
            padding-bottom: 12px;
            border-bottom: 1px solid var(--c-shade);
        }

        &__word {
            margin-top: 8px;
            font-size: 20px;
        }

        &__main {
            margin-top: 8px;
        }
    }
</style>