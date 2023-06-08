<template>
    <div class="card-word card">
        <div class="card-word__img-container">
            <img
                class="card-word__img"
                :src="props.img"
                :alt="props.translation || 'Слово'"
            />
        </div>
        <div class="card-word__word">
            <div class="card-word__title">{{ props.word }}</div>
            <div class="card-word__translation">{{ props.translation }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        img: String,
        word: String,
        translation: String,
        transcription: String,
    });
</script>

<style scoped lang="scss">
    .card-word {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;

        font-size: 18px;

        width: 180px;
        height: 220px;

        &__img-container {
            border-radius: 8px;
            overflow: hidden;
            width: 100%;
            height: 160px;
        }
        &__img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }

        &__data {
            text-align: center;
        }

        &__word {
            text-align: center;
        }

        &__title {
            margin-top: 6px;
            font-weight: var(--fw-semi-bold);
            font-size: 20px;
        }

        &__translation {
            filter: opacity(0.6);
        }

        &__button {
            margin-top: auto;
        }
    }
</style>
