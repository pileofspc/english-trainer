<template>
    <div class="trainer-eng-to-rus block">
        <div class="trainer-eng-to-rus__content" v-if="!showResults">
            <ProgressBarCounter
                class="trainer-eng-to-rus__progress"
                :current="correctAnswers"
                :total="totalAnswers"
                :max="data.length"
            />
            <div class="trainer-eng-to-rus__middle">
                <div class="trainer-eng-to-rus__main">
                    <div class="trainer-eng-to-rus__word-data">
                        <div class="trainer-eng-to-rus__word">{{ currentWordData.word }}</div>
                        <div
                            class="trainer-eng-to-rus__transcription"
                            v-if="props.from !== 'rus'"
                        >
                            {{ currentWordData.transcription }}
                        </div>
                        <div class="trainer-eng-to-rus__image-container" :class="{'trainer-eng-to-rus__image-container_blurred': !revealed}">
                            <img class="trainer-eng-to-rus__image" :src="currentWordData.imgPath" alt="">
                        </div>
                    </div>
                    <div class="trainer-eng-to-rus__options">
                        <TrainerOption
                            v-for="option in options"
                            class="trainer-eng-to-rus__option"
                            :translation="option.translation"
                            :status="option.status"
                            @click="onChoose(option)"
                        />
                    </div>

                </div>
                <div class="trainer-eng-to-rus__controls">
                    <VButton
                        variant="accent"
                        :inactive="!revealed"
                        @click="onContinue"
                    >
                        Продолжить
                    </VButton>
                </div>
            </div>
        </div>
        <div class="trainer-eng-to-rus__results" v-if="showResults">
            <svg class="trainer-eng-to-rus__result-image">
                <use :href="`#${ successImage.id }`"></use>
            </svg>
            <div class="trainer-eng-to-rus__result-title">Упражнение завершено</div>
            <div class="trainer-eng-to-rus__result-description">Вы правильно перевели {{ correctAnswersText }}, переведено неправильно {{ wrongAnswersText }}</div>
        </div>
    </div>
</template>




<script setup>
    import { computed, ref } from "vue";
    import ProgressBarCounter from "@components/ProgressBarCounter.vue";
    import TrainerOption from '@modules/TrainerOption/TrainerOption.vue';
    import VButton from '@components/VButton.vue';
    import successImage from '@images/icons/Success.svg?sprite';

    const props = defineProps({
        from: {
            type: String,
            validator(value) {
                return ['rus', 'eng'].includes(value)
            }
        },
    });

    let data = [
        {
            word: 'wren',
            transcription: '[ren]',
            imgPath: '/static/words/krapivnik.jpg',
            options: [
                {
                    translation: 'Настольный теннис',
                    isCorrect: false
                },
                {
                    translation: 'Крапивник',
                    isCorrect: true
                },
                {
                    translation: 'Торговля',
                    isCorrect: false
                },
                {
                    translation: 'Настольный теннис',
                    isCorrect: false
                },
                {
                    translation: 'Настольный теннис',
                    isCorrect: false
                },
            ]
        },
        {
            word: 'fever',
            transcription: '[ˈfiːvə(r)]',
            imgPath: '/static/words/lihoradka.jpg',
            options: [
                {
                    translation: 'Настольный теннис',
                    isCorrect: false
                },
                {
                    translation: 'Крапивник',
                    isCorrect: false
                },
                {
                    translation: 'Лихорадка',
                    isCorrect: true
                },
                {
                    translation: 'Настольный теннис',
                    isCorrect: false
                },
                {
                    translation: 'Настольный теннис',
                    isCorrect: false
                },
            ]
        },
        {
            word: 'fever2',
            transcription: '[ˈfiːvə(r)2]',
            imgPath: '/static/words/krapivnik.jpg',
            options: [
                {
                    translation: 'Настольный теннис',
                    isCorrect: false
                },
                {
                    translation: 'Крапивник',
                    isCorrect: false
                },
                {
                    translation: 'Настольный теннис',
                    isCorrect: false
                },
                {
                    translation: 'Настольный теннис',
                    isCorrect: false
                },
                {
                    translation: 'Лихорадка2',
                    isCorrect: true
                },
            ]
        },
        {
            word: 'fever3',
            transcription: '[ˈfiːvə(r)3]',
            imgPath: '/static/words/krapivnik.jpg',
            options: [
                {
                    translation: 'Настольный теннис',
                    isCorrect: false
                },
                {
                    translation: 'Лихорадка3',
                    isCorrect: true
                },
                {
                    translation: 'Крапивник',
                    isCorrect: false
                },
                {
                    translation: 'Настольный теннис',
                    isCorrect: false
                },
                {
                    translation: 'Настольный теннис',
                    isCorrect: false
                },
            ]
        },
    ];

    const currentWordPos = ref(0);
    const showResults = ref(false);
    const revealed = ref(false);
    const currentChosen = ref(null);
    const correctAnswers = ref(0);
    const totalAnswers = ref(0);

    const currentWordData = computed(() => data[currentWordPos.value]);
    const options = computed( () => currentWordData.value.options.map(option => {
        option.status = null;
        return option
    }));
    const correctAnswersText = computed(() => getRenderedText(correctAnswers.value));
    const wrongAnswersText = computed(() => getRenderedText(totalAnswers.value - correctAnswers.value));

    function getRenderedText(number) {
        const lastDigit = number % 10;
        if (
            lastDigit === 2 ||
            lastDigit === 3 ||
            lastDigit === 4
        ) {
            return `${number} слова`
        } else if (
            lastDigit === 1
        ) {
            return `${number} слово`
        } else {
            return `${number} слов`
        }
    }



    function nextWord() {
        if (currentWordPos.value < data.length - 1) {
            currentWordPos.value++;
        } else {
            showResults.value = true;
        }
    }
    function onContinue() {
        currentChosen.value = null;
        revealed.value = false;
        nextWord();
    }
    function userAnsweredCorrectly() {
        correctAnswers.value++;
        totalAnswers.value++;
    }
    function userAnsweredIncorrectly() {
        totalAnswers.value++;
    }

    function revealCorrect(chosenOption) {
        for (const option of options.value) {
            if (option.isCorrect && option !== chosenOption) {
                option.status = 'correct';
            }
        }
    }
    function revealChosen(chosenOption) {
        if (chosenOption.isCorrect) {
            chosenOption.status = 'chosen-correct';
        } else {
            chosenOption.status = 'chosen-incorrect';
        }
    }
    function onChoose(chosenOption) {
        if (revealed.value) {
            return
        }
        revealCorrect(chosenOption);
        revealChosen(chosenOption);
        revealed.value = true;
        currentChosen.value = chosenOption;
        if (currentChosen.value.isCorrect) {
            userAnsweredCorrectly()
        } else {
            userAnsweredIncorrectly()
        }
    }
</script>




<style lang="scss" scoped>
    .trainer-eng-to-rus {
        padding: 20px;

        &__middle {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 32px;
        }

        &__main {
            display: flex;
            align-items: center;
            gap: 80px;

            font-size: 32px;
        }

        &__word-data {
            text-align: center;
        }

        &__transcription {
            font-size: 24px;
            filter: opacity(0.6);
        }

        &__image-container {
            margin-top: 24px;
            width: 180px;
            height: 180px;

            border: 1px solid var(--c-shade);
            border-radius: 50%;
            overflow: hidden;

            &_blurred {
                filter: blur(16px) grayscale(50%);
            }
        }

        &__image {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }

        &__options {
        }

        &__controls {
            display: flex;
            align-items: center;
            justify-content: center;

            margin-top: 32px;
        }

        &__option {
            min-width: 320px;
        }

        &__option:not(:first-child) {
            margin-top: 12px;
        }

        &__results {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &__result-image {
            color: var(--c-success);
            width: 140px;
            height: 140px;

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