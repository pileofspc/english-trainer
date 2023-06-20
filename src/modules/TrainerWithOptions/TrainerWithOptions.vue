<template>
    <div class="trainer-eng-to-rus block">
        <Container :status="fetchStatus">
            <div class="trainer-eng-to-rus__content" v-if="!showResults">
                <ProgressBarCounter
                    class="trainer-eng-to-rus__progress"
                    :current="correctAnswers"
                    :total="totalAnswers"
                    :max="trainerData.length"
                />
                <div class="trainer-eng-to-rus__middle">
                    <div class="trainer-eng-to-rus__main">
                        <div class="trainer-eng-to-rus__word-data">
                            <div class="trainer-eng-to-rus__word">
                                {{ currentWordData?.word }}
                            </div>
                            <div
                                class="trainer-eng-to-rus__transcription"
                                v-if="props.trainingType !== 'train-ru-en'"
                            >
                                {{ currentWordData?.transcription }}
                            </div>
                            <div
                                class="trainer-eng-to-rus__image-container"
                                :class="{
                                    'trainer-eng-to-rus__image-container_blurred':
                                        !revealed,
                                }"
                            >
                                <img
                                    class="trainer-eng-to-rus__image"
                                    :src="currentWordData?.img"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="trainer-eng-to-rus__options">
                            <TrainerOption
                                v-for="option in options"
                                class="trainer-eng-to-rus__option"
                                :word="option.word"
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
            <div class="trainer-eng-to-rus__results" v-else>
                <svg class="trainer-eng-to-rus__result-image">
                    <use :href="`#${successImage.id}`"></use>
                </svg>
                <div class="trainer-eng-to-rus__result-title">
                    Упражнение завершено
                </div>
                <div class="trainer-eng-to-rus__result-description">
                    Вы правильно перевели {{ correctAnswersText }}, переведено
                    неправильно {{ wrongAnswersText }}
                </div>
            </div>
        </Container>
    </div>
</template>

<script setup lang="ts">
    import ProgressBarCounter from "@components/ProgressBarCounter.vue";
    import VButton from "@components/VButton.vue";
    import successImage from "@images/icons/Success.svg?sprite";
    import TrainerOption from "@modules/TrainerOption/TrainerOption.vue";
    import type {
        ITrainerOption,
        IWithOptionsWord,
        TrainingType,
    } from "@types";
    import type { PropType } from "vue";
    import { computed, ref } from "vue";
    import api from "/src/api";
    import useFetch from "@composables/useFetch";

    const props = defineProps({
        trainingType: {
            type: String as PropType<TrainingType>,
        },
        wordSetId: {
            type: String,
            required: true,
        },
    });

    let url =
        props.trainingType === "train-en-ru"
            ? api["train-en-ru"]
            : api["train-ru-en"];
    const { fetchedData, fetchStatus } = useFetch<IWithOptionsWord[]>({
        url: `${url}?id=${props.wordSetId}`,
        defaultValue: [],
    });

    // const trainerData = ref<IWithOptionsWord[] | undefined[]>([]);
    const trainerData = fetchedData;
    const currentWordPos = ref(0);
    const showResults = ref(false);
    const revealed = ref(false);
    const currentChosen = ref<ITrainerOption | null>(null);
    const correctAnswers = ref(0);
    const totalAnswers = ref(0);

    const currentWordData = computed(
        () => trainerData.value[currentWordPos.value]
    );
    const options = computed(() => currentWordData.value?.options || []);
    const correctAnswersText = computed(() =>
        getRenderedText(correctAnswers.value)
    );
    const wrongAnswersText = computed(() =>
        getRenderedText(totalAnswers.value - correctAnswers.value)
    );

    function getRenderedText(number: number) {
        const lastTwoDigits = number % 100;
        if (
            lastTwoDigits === 11 ||
            lastTwoDigits === 12 ||
            lastTwoDigits === 13 ||
            lastTwoDigits === 14
        ) {
            return `${number} слов`;
        }

        const lastDigit = number % 10;
        if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
            return `${number} слова`;
        } else if (lastDigit === 1) {
            return `${number} слово`;
        } else {
            return `${number} слов`;
        }
    }

    function nextWord() {
        if (currentWordPos.value < trainerData.value.length - 1) {
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

    function revealCorrect(chosenOption: ITrainerOption) {
        for (const option of options.value) {
            if (option.isCorrect && option !== chosenOption) {
                option.status = "correct";
            }
        }
    }
    function revealChosen(chosenOption: ITrainerOption) {
        if (chosenOption.isCorrect) {
            chosenOption.status = "chosen-correct";
        } else {
            chosenOption.status = "chosen-incorrect";
        }
    }
    function onChoose(chosenOption: ITrainerOption) {
        if (revealed.value) {
            return;
        }
        revealCorrect(chosenOption);
        revealChosen(chosenOption);
        revealed.value = true;
        currentChosen.value = chosenOption;
        if (currentChosen.value.isCorrect) {
            userAnsweredCorrectly();
        } else {
            userAnsweredIncorrectly();
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
