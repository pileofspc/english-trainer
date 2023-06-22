<template>
    <div class="word-set">
        <router-link class="word-set__link block" :to="toRoute">
            <img
                class="word-set__link-img"
                :src="props.img"
                :alt="props.title"
            />
        </router-link>
        <div class="word-set__data">
            <div class="word-set__title large-block-title">
                {{ props.title }}
            </div>
            <div class="word-set__description">
                {{ props.shortDescription }}
            </div>
            <router-link class="word-set__button-learn" :to="toRoute">
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
        shortDescription: String,
    });

    const toRoute = `/word-set/${props.id}`;
</script>

<style lang="scss" scoped>
    @use "@styles/mixins" as m;

    .word-set {
        display: flex;
        align-items: center;
        gap: 80px;
        width: 100%;

        margin-left: 100px;

        transform: translate(-100px);

        &__link {
            width: 300px;
            max-width: 100%;
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
            width: 100%;
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

    @include m.respondSimple("xsm") {
        .word-set {
            &__link {
                width: 300px;
            }
        }
    }

    @include m.respondSimple("sm") {
        .word-set {
            flex-direction: column;

            &__link {
                width: 400px;
            }
        }
    }

    @include m.respondSimple("md") {
        .word-set {
            gap: 40px;
        }
    }
</style>
