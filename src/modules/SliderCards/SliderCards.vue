<template>
    <div class="slider slider_cards block">
        <button class="slider__slide slider__slide_left">
            <svg class="slider__slide-svg">
                <use :href="`#${ChevronLeft.id}`"></use>
            </svg>
        </button>
        <a class="slider__link block" :href="props.sliderItems[0].route">
            <img class="slider__link-img" :src="props.sliderItems[0].imgPath" :alt="props.sliderItems[0].title">
        </a>
        <div class="slider__data">
            <div class="slider__title">{{ props.sliderItems[0].title }}</div>
            <div class="slider__description">{{ props.sliderItems[0].description }}</div>
            <VButtonAccent text="Изучить" class="slider__button-learn"></VButtonAccent>
        </div>
        <button class="slider__slide slider__slide_right">
            <svg class="slider__slide-svg">
                <use :href="`#${ChevronRight.id}`"></use>
            </svg>
        </button>
    </div>
</template>

<script setup>
    import VButtonAccent from "@components/UI/VButtonAccent.vue";
    import ChevronLeft from '@images/icons/ChevronLeft.svg?sprite';
    import ChevronRight from '@images/icons/ChevronRight.svg?sprite';


    // const props = defineProps({
    //     route: String,
    //     imgPath: String,
    //     title: String,
    //     description: String
    // });

    const props = defineProps({
        sliderItems: {
            type: Array,
            required: true
        }
    });

    console.log(props.sliderItems)
</script>

<style scoped lang="scss">
    .slider {
        position: relative;
        display: flex;
        align-items: center;
        padding: 60px 60px;
        gap: 80px;

        &__link {
            max-width: 400px;
            max-height: 400px;
            flex-shrink: 0.1;
            overflow: hidden;

            transition: transform 0.2s;

            &:hover {
                transform: scale(1.04);
            }
        }

        &__link-img {
            object-fit: cover;
        }

        &__data {
            display: flex;
            flex-direction: column;
            font-size: 20px;
        }

        &__title {
            font-size: 56px;
            font-weight: var(--fw-bold);
        }

        &__button-learn {
            font-size: 16px;
            margin-top: 24px;
            align-self: flex-start;
        }

        &__slide {
            cursor: pointer;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: transparent;
            border: none;

            &_left {
                left: 0;
            }

            &_right {
                right: 0;
            }

            &:hover .slider__slide-svg {
                opacity: 1;
            }
        }

        &__slide-svg {
            width: 60px;
            height: 60px;
            color: var(--c-secondary);

            opacity: 0.5;
            transition: opacity 0.2s;

            &:hover {
                opacity: 1;
            }
        }
    }
</style>