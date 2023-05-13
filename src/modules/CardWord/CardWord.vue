<template>
    <div class="card-word card">
        <div class="card-word__img-container">
            <img class="card-word__img" :src="props.imgPath" alt="WORD">
        </div>
        <div class="card-word__word">
            <div class="card-word__title">{{ word }}</div>
            <div class="card-word__translation">{{ translation }}</div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        imgPath: String,
        word: String,
        translation: String
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
        }
        
        &__data {
            text-align: center;
        }

        &__img {
            height: 100%;
            object-fit: cover;
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