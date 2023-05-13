<template>
    <div class="theme-header block">
            <div class="theme-header__theme">
                <div class="theme-header__img-container block">
                    <img class="theme-header__img" :src="props.imgPath" :alt="props.title">
                </div>
                <div class="theme-header__data">
                    <div class="theme-header__title">{{ props.title }}</div>
                    <div class="theme-header__description">{{ props.description }}</div>
                    <router-link class="theme-header__button-learn" :to="routeTo">
                        <VButtonAccent text="Тренировать слова"></VButtonAccent>
                    </router-link>

                </div>
            </div>
    </div>
</template>

<script setup>
    import { useRoute } from "vue-router";
    import VButtonAccent from '@components/VButtonAccent.vue';

    const props = defineProps({
        imgPath: String,
        title: String,
        description: String
    });

    const route = useRoute();
    const routeTo = `/word-set/${route.params.wordSetId}/train`;
</script>

<style scoped lang="scss">
    .theme-header {
        position: relative;
        padding: 20px;

        overflow: hidden;

        &__theme {
            flex-shrink: 0;

            display: flex;
            align-items: center;
            gap: 80px;
            width: 100%;

            margin-left: 100px;

            transform: translate(-100px);
        }

        &__img-container {
            max-width: 180px;
            max-height: 180px;
            flex-shrink: 0.15;
            overflow: hidden;
        }

        &__img {
            object-fit: cover;
        }

        &__data {
            display: flex;
            flex-direction: column;
            font-size: 16px;
        }

        &__title {
            font-size: 20px;
            line-height: 1.2;
            font-weight: var(--fw-bold);
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