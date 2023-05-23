<template>
    <div class="train-link train-links__link block"
        :style="{ backgroundImage: `url(${props.bg})` }"
    >
        <div class="train-link__title">{{ props.title }}</div>
        <div class="train-link__description">{{ props.description }}</div>
        <VButtonIcon class="train-link__button" variant="accent" :icon-id="ChevronRight.id"/>
    </div>
</template>

<script setup>
    import VButtonIcon from '@components/VButtonIcon.vue';
    import ChevronRight from '@images/icons/ChevronRight.svg?sprite';

    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        bg: {
            type: String
        }
    })
</script>

<style lang="scss" scoped>
    .train-link {
        display: flex;
        flex-direction: column;
        padding: 36px 24px;
        width: 300px;
        height: 220px;

        background-repeat: no-repeat;
        background-position: right bottom;
        background-size: 110px 110px;

        &__title {
            font-size: 24px;
        }

        &__description {
            margin-top: 8px;
            font-size: 14px;
        }

        &__button {
            margin-top: auto;
            align-self: flex-start;
        }
    }
</style>