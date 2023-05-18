<template>
    <div class="trainer block">
        <div class="trainer__main" v-if="!showResults">
            <ProgressBarCounter
                class="trainer__progress"
                :current="correctAnswers"
                :total="totalAnswers"
                :max="data.length"
            />
            <div class="trainer__middle">
                <div class="trainer__word">{{ currentWordData.word }}</div>
                <div class="trainer__translation">{{ currentWordData.visibleTranslation }}</div>
                <div class="trainer__task">Верный ли это перевод?</div>
                <div class="trainer__controls">
                    <VButton
                        class="trainer__button"
                        text="Не верно"
                        variant="error"
                        @click="checkUserAnswer(false)"
                    />
                    <VButton
                        class="trainer__button"
                        text="Верно"
                        variant="success"
                        @click="checkUserAnswer(true)"
                    />
                </div>
            </div>
        </div>
        <div class="trainer__results" v-if="showResults">
            <svg class="trainer__result-image">
                <use :href="`#${ successImage.id }`"></use>
            </svg>
            <div class="trainer__result-title">Упражнение завершено</div>
            <div class="trainer__result-description">Вы правильно перевели {{ correctAnswers }} слов, переведено неправильно {{ totalAnswers - correctAnswers }} слов</div>
        </div>
    </div>
</template>




<script setup>
    import { computed, ref } from "vue";
    import ProgressBarCounter from "@components/ProgressBarCounter.vue";
    import VButton from '@components/VButton.vue';
    import successImage from '@images/icons/Success.svg?sprite';

    let data = [
        {
            word: 'fever1',
            visibleTranslation: 'лихорадка1',
            actualTranslation: 'лихорадка1'
        },
        {
            word: 'fever2',
            visibleTranslation: 'стол2',
            actualTranslation: 'лихорадка2'
        },
        {
            word: 'fever3',
            visibleTranslation: 'лихорадка3',
            actualTranslation: 'лихорадка3'
        },
        {
            word: 'fever4',
            visibleTranslation: 'стол4',
            actualTranslation: 'лихорадка4'
        },
        {
            word: 'fever5',
            visibleTranslation: 'лихорадка5',
            actualTranslation: 'лихорадка5'
        },
        {
            word: 'fever6',
            visibleTranslation: 'стол6',
            actualTranslation: 'лихорадка6'
        },
        {
            word: 'fever7',
            visibleTranslation: 'стол7',
            actualTranslation: 'лихорадка7'
        },
        {
            word: 'fever8',
            visibleTranslation: 'стол8',
            actualTranslation: 'лихорадка8'
        },
        {
            word: 'fever9',
            visibleTranslation: 'стол9',
            actualTranslation: 'лихорадка9'
        },
        {
            word: 'fever10',
            visibleTranslation: 'стол10',
            actualTranslation: 'лихорадка10'
        },
    ];

    const currentWordPos = ref(0);
    const currentWordData = computed(() => data[currentWordPos.value]);
    const isTranslationCorrect = computed(() => currentWordData.value.visibleTranslation === currentWordData.value.actualTranslation);
    const correctAnswers = ref(0);
    const totalAnswers = ref(0);
    const showResults = ref(false);

    function nextWord() {
        if (currentWordPos.value < data.length - 1) {
            currentWordPos.value++;
        } else {
            showResults.value = true;
        }
    }
    function checkUserAnswer(answer) {
        if (answer && isTranslationCorrect.value || !answer && !isTranslationCorrect.value) {
            userAnsweredCorrectly()
        } else {
            userAnsweredIncorrectly()
        }
    }
    function userAnsweredCorrectly() {
        correctAnswers.value++;
        totalAnswers.value++;
        nextWord();
    }
    function userAnsweredIncorrectly() {
        totalAnswers.value++;
        nextWord();
    }
</script>




<style lang="scss" scoped>
    .trainer {
        padding: 20px;

        &__middle {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;

            font-size: 32px;
        }

        &__translation {
            filter: opacity(0.6);
        }

        &__task {
            margin-top: 20px;
            color: var(--c-secondary);
            font-size: 16px;
        }

        &__controls {
            align-self: stretch;

            display: flex;
            justify-content: center;
            gap: 24px;
            margin-top: 20px;
        }

        &__button {
            width: 400px;
            font-size: 20px;
        }

        &__results {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &__result-image {
            color: var(--c-success);
            width: 200px;
            height: 200px;

            margin-left: auto;
            margin-right: auto;
        }

        &__result-title {
            font-size: 50px;
        }

        &__result-description {
            margin-top: 12px;
            font-size: 20px;
        }
    }
</style>