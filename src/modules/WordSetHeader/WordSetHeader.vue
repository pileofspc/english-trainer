<template>
    <div class="theme-header block">
        <div class="theme-header__theme">
            <div class="theme-header__img-container block">
                <img
                    class="theme-header__img"
                    :src="props.img"
                    :alt="props.title"
                />
            </div>
            <div class="theme-header__data">
                <div class="theme-header__title block-title">
                    {{ props.title }}
                </div>
                <div class="theme-header__description">
                    {{ props.description }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        img: String,
        title: String,
        description: String,
    });
</script>

<style scoped lang="scss">
    .theme-header {
        position: relative;
        padding: 20px;
        overflow: hidden;

        background: white url("@images/Artwork.svg") no-repeat calc(100% + 20px)
            0%;
        background-size: auto 101%;

        &__theme {
            display: flex;
            flex-shrink: 0;
            gap: 24px;
        }

        &__img-container {
            width: 180px;
            height: 180px;
            overflow: hidden;
            align-self: center;
        }

        &__img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }

        &__data {
            display: flex;
            flex-direction: column;
            font-size: 16px;
            width: calc(100% - 480px);
        }

        &__description {
            margin-top: 8px;
        }

        &__button-learn {
            font-size: 14px;
            margin-top: 12px;
            align-self: flex-start;
        }
    }
</style>
