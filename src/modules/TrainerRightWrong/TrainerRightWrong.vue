<template>
    <div class="trainer block">
        <div class="trainer__main" v-if="!showResults">
            <ProgressBarCounter
                class="trainer__progress"
                :current="correctAnswers"
                :total="totalAnswers"
                :max="trainerData.length"
            />
            <div class="trainer__middle">
                <div class="trainer__word">
                    {{ currentWordData?.word }}
                </div>
                <div class="trainer__translation">
                    {{ currentWordData?.visibleTranslation }}
                </div>
                <div class="trainer__status" v-if="!showCurrentWordResult">
                    Верный ли это перевод?
                </div>
                <div class="trainer__status" v-if="showCurrentWordResult">
                    <svg
                        class="trainer__status-svg"
                        :style="{ color: statusColor }"
                    >
                        <use :href="`#${statusIcon.id}`"></use>
                    </svg>
                    <span class="trainer__status-text">{{ statusText }}</span>
                </div>
                <div class="trainer__controls">
                    <VButton
                        :style="{
                            width: '400px',
                            'font-size': '20px',
                        }"
                        variant="error"
                        @click="checkUserAnswer(false)"
                    >
                        Не верно
                    </VButton>
                    <VButton
                        :style="{
                            width: '400px',
                            'font-size': '20px',
                        }"
                        variant="success"
                        @click="checkUserAnswer(true)"
                    >
                        Верно
                    </VButton>
                </div>
            </div>
        </div>

        <div class="trainer__results" v-if="showResults">
            <svg class="trainer__result-image">
                <use :href="`#${successImage.id}`"></use>
            </svg>
            <div class="trainer__result-title">Упражнение завершено</div>
            <div class="trainer__result-description">
                Вы правильно перевели {{ correctAnswersText }}, переведено
                неправильно {{ wrongAnswersText }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import ProgressBarCounter from "@components/ProgressBarCounter.vue";
    import VButton from "@components/VButton.vue";
    import successImage from "@images/icons/Success.svg?sprite";
    import { computed, ref } from "vue";

    import Checkmark from "@images/icons/Checkmark.svg?sprite";
    import Cross from "@images/icons/Cross.svg?sprite";
    import type { IRightWrongWord, TrainJson } from "@types";
    import api from "/src/api";

    const props = defineProps({
        wordSetId: {
            type: String,
            required: true,
        },
    });

    const trainerData = ref<IRightWrongWord[]>([]);

    const currentWordPos = ref(0);
    const correctAnswers = ref(0);
    const totalAnswers = ref(0);
    const statusIcon = ref(Cross);
    const statusText = ref("Неправильно");
    const statusColor = ref("var(--c-error)");
    const showCurrentWordResult = ref(false);
    const showResults = ref(false);

    const currentWordData = computed(
        () => trainerData.value[currentWordPos.value]
    );
    const isTranslationCorrect = computed(
        () =>
            currentWordData.value?.visibleTranslation ===
            currentWordData.value?.actualTranslation
    );
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
    function checkUserAnswer(answer: boolean) {
        if (showCurrentWordResult.value) {
            return;
        }
        if (
            (answer && isTranslationCorrect.value) ||
            (!answer && !isTranslationCorrect.value)
        ) {
            userAnsweredCorrectly();
        } else {
            userAnsweredIncorrectly();
        }
    }
    function userAnsweredCorrectly() {
        changeStatus(true);
        showCurrentWordResult.value = true;
        correctAnswers.value++;
        totalAnswers.value++;

        setTimeout(() => {
            showCurrentWordResult.value = false;
            nextWord();
        }, 1000);
    }
    function userAnsweredIncorrectly() {
        changeStatus(false);
        showCurrentWordResult.value = true;
        totalAnswers.value++;

        setTimeout(() => {
            showCurrentWordResult.value = false;
            nextWord();
        }, 1000);
    }
    function changeStatus(boolean: boolean) {
        if (boolean === true) {
            statusIcon.value = Checkmark;
            statusText.value = "Правильно";
            statusColor.value = "var(--c-success)";
        }
        if (boolean === false) {
            statusIcon.value = Cross;
            statusText.value = "Неправильно";
            statusColor.value = "var(--c-error)";
        }
    }

    fetch(api.train + `?id=${props.wordSetId}`)
        .then((res) => res.json())
        .then((json: TrainJson) => (trainerData.value = json.data.trainerData));
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

        &__status {
            display: flex;
            align-items: center;
            margin-top: 20px;
            color: var(--c-secondary);
            font-size: 16px;

            min-height: 40px;
        }

        &__status-svg {
            width: 36px;
            height: 36px;
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
