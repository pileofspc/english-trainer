<template>
    <div class="wordset-header block">
        <div class="wordset-header__wordset">
            <div class="wordset-header__img-container block">
                <img
                    class="wordset-header__img"
                    :src="props.img"
                    :alt="props.title"
                />
            </div>
            <div class="wordset-header__data">
                <div class="wordset-header__title block-title">
                    {{ props.title }}
                </div>
                <div class="wordset-header__description">
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
    @use "@styles/mixins" as m;
    .wordset-header {
        position: relative;
        padding: 20px;
        overflow: hidden;

        background: white url("@images/Artwork.svg") no-repeat calc(100% + 20px)
            0%;
        background-size: auto 101%;

        &__wordset {
            display: flex;
            flex-shrink: 0;
            gap: 24px;
        }

        &__img-container {
            width: 180px;
            height: 180px;
            max-width: 100%;
            overflow: hidden;
            align-self: center;
            flex-shrink: 0;
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

    @include m.respondSimple("mdlg") {
        .wordset-header {
            background-position: calc(100% + 120px) 0;
            &__data {
                width: calc(100% - 360px);
            }
        }
    }

    @include m.respondSimple("sm") {
        .wordset-header {
            background: var(--c-bright);

            &__data {
                width: auto;
            }
        }
    }

    @include m.respondSimple("xsm") {
        .wordset-header {
            &__wordset {
                flex-direction: column;
            }

            &__img-container {
                width: 260px;
            }
        }
    }
</style>
