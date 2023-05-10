<template>
    <div class="word card">
        <div class="word__img-container">
            <img class="word__img" src="static/sport1.jpg" alt="WORD">
        </div>
        <div class="word__data">
            <div class="word__title">
                animals
            </div>
            <div class="word__translation">
                животные
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style scoped lang="scss">
    .word {
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