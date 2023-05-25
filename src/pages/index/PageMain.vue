<template>
    <LayoutDefault>
        <div class="page-main__first-row">
            <About class="page-main__about" />
            <WordOfDay class="page-main__word-of-day" />
        </div>
        <SliderWordSets class="page-main__slider" />
    </LayoutDefault>
</template>

<script setup>
    import SliderWordSets from "@modules/SliderWordSets/SliderWordSets.vue";
    import LayoutDefault from '@components/LayoutDefault.vue';
    import WordOfDay from "@modules/WordOfDay/WordOfDay.vue";
    import About from "@components/About.vue";
</script>

<style lang="scss" scoped>
    .page-main {
        &__first-row {
            display: flex;
            gap: 24px;
        }

        &__about {
            flex-grow: 1;
        }

        &__word-of-day {
            flex-basis: 38%;
        }

        &__slider {
            margin-top: 24px;
        }
    }
</style>