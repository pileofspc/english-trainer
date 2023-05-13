<template>
    <div class="theme">
        <router-link class="theme__link block" :to="toRoute">
            <img class="theme__link-img" :src="props.imgPath" :alt="props.title">
        </router-link>
        <div class="theme__data">
            <div class="theme__title">{{ props.title }}</div>
            <div class="theme__description">{{ props.description }}</div>
            <router-link
                :to="toRoute"
                class="theme__button-learn"
            >
                <VButtonAccent text="Изучить"></VButtonAccent>
            </router-link>
        </div>
    </div>
</template>

<script setup>
    import VButtonAccent from "@components/VButtonAccent.vue";

    const props = defineProps({
        id: [String, Number],
        imgPath: String,
        title: String,
        description: String
    })

    const toRoute = `/word-set/${props.id}`;
</script>

<style lang="scss" scoped>
    .theme {
        display: flex;
        align-items: center;
        gap: 80px;
        width: 100%;

        margin-left: 100px;

        transform: translate(-100px);


        &__link {
            max-width: 400px;
            max-height: 400px;
            flex-shrink: 0.15;
            overflow: hidden;

            transition: transform 0.2s;

            &:hover {
                transform: scale(1.04);
            }
        }

        &__link-img {
            height: 100%;
            object-fit: cover;
        }

        &__data {
            display: flex;
            flex-direction: column;
            font-size: 20px;
        }

        &__title {
            font-size: 56px;
            line-height: 1.2;
            font-weight: var(--fw-bold);
        }

        &__description {
            margin-top: 10px;
        }

        &__button-learn {
            font-size: 16px;
            margin-top: 24px;
            align-self: flex-start;
        }
    }
</style>