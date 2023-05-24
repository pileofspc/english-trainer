<template>
    <LayoutDefault>
        <div class="page-main__contents">
            <About class="page-main__about" />
            <WordOfDay class="page-main__word-of-day" />
            <SliderWordSets class="page-main__slider" />
        </div>
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
        &__contents {
            display: flex;
            flex-wrap: wrap;
            gap: 24px;
        }

        &__about {
            flex-basis: 62%;
        }

        &__word-of-day {
            flex-grow: 1;
        }

        &__slider {

        }
    }
</style>