<template>
    <div class="theme">
        <router-link
            class="theme__link block"
            :to="toRoute"
            @click="handleClick"
        >
            <img class="theme__link-img" :src="props.img" :alt="props.title" />
        </router-link>
        <div class="theme__data">
            <div class="theme__title large-block-title">{{ props.title }}</div>
            <div class="theme__description">{{ props.description }}</div>
            <router-link
                class="theme__button-learn"
                :to="toRoute"
                @click="handleClick"
            >
                <VButton variant="accent">Изучить</VButton>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
    import VButton from "@components/VButton.vue";
    import { useGeneralStore } from "/src/stores/storeGeneral";

    const genStore = useGeneralStore();

    const props = defineProps({
        id: {
            type: String,
        },
        img: String,
        title: String,
        description: String,
    });

    const toRoute = `/word-set/${props.id}`;

    function handleClick() {
        if (props.title) {
            // genStore.saveDisplayName(props.title);
        }
    }
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
            width: 300px;
            height: 300px;
            flex-shrink: 0;
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
