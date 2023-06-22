<template>
    <LayoutMainPage>
        <div class="page-main__first-row">
            <About class="page-main__about" />
            <WordOfDay class="page-main__word-of-day" />
        </div>
        <SliderWordSets class="page-main__slider" />
        <Reviews class="page-main__reviews"></Reviews>
    </LayoutMainPage>
</template>

<script setup lang="ts">
    import SliderWordSets from "@modules/SliderWordSets/SliderWordSets.vue";
    import LayoutMainPage from "@components/LayoutMainPage.vue";
    import WordOfDay from "@modules/WordOfDay/WordOfDay.vue";
    import About from "@components/About.vue";
    import Reviews from "@components/Reviews.vue";
</script>

<style lang="scss" scoped>
    @use "@styles/mixins" as m;

    .page-main {
        &__first-row {
            display: flex;
            gap: 24px;
        }

        &__about {
            flex-basis: 62%;
        }

        &__word-of-day {
            flex-basis: 38%;
        }

        &__slider {
            margin-top: 24px;
        }

        &__reviews {
            margin-top: 24px;
        }

        &__breadcrumbs {
            margin-bottom: 24px;
        }
    }

    @include m.respondSimple("md") {
        .page-main {
            &__first-row {
                flex-direction: column;
            }
        }
    }
</style>
