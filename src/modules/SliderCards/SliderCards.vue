<template>
    <div class="slider slider_cards block" ref="slider">
        <button class="slider__slide slider__slide_left" @click="slidePrev">
            <svg class="slider__slide-svg">
                <use :href="`#${ChevronLeft.id}`"></use>
            </svg>
        </button>


        <div
            class="slider__item-container"
            ref="itemContainer"
            :style="{transform: `translate(${currentX}px)`}"
        >
            <div class="slider__item" v-for="item in sliderItems">
                <a class="slider__link block" :href="item.route">
                    <img class="slider__link-img" :src="item.imgPath" :alt="item.title">
                </a>
                <div class="slider__data">
                    <div class="slider__title">{{ item.title }}</div>
                    <div class="slider__description">{{ item.description }}</div>
                    <VButtonAccent text="Изучить" class="slider__button-learn"></VButtonAccent>
                </div>
            </div>
        </div>


        <button class="slider__slide slider__slide_right" @click="slideNext">
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
    import {computed, onMounted, ref} from "vue";


    // const props = defineProps({
    //     route: String,
    //     imgPath: String,
    //     title: String,
    //     description: String
    // });

    const sliderItems = ref([
        {
            route: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 111',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            route: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 222',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            route: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 333',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            route: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 444 asdasd dfsgds fdsg',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            route: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 555',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            route: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 666',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            route: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 777',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            route: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 888',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            route: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 999',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
    ]);

    const time = 5000;

    mapItems(sliderItems);

    let inTransition = false;
    const slider = ref();
    const itemContainer = ref();
    const firstIndex = 1;
    const lastIndex = sliderItems.value.length - 2;
    const middleIndex = Math.ceil(sliderItems.value.length/2 - 1);

    const sliderWidth = ref(1164);
    const currentPos = ref(middleIndex);
    const gap = ref(100);
    const itemWidth = computed(() => sliderWidth.value);
    const offset = computed(() => itemWidth.value + gap.value);
    const currentX = computed(() => offset.value * -1 * currentPos.value);

    onMounted(() => {
        update();
        window.addEventListener('resize', () => {
            update();
        });
        itemContainer.value.addEventListener('transitionstart', () => {
            inTransition = true;
        });
        itemContainer.value.addEventListener('transitionend', () => {
            inTransition = false;
            tryReset();
        });



        let timer = startAutoSlide(time);

        slider.value.addEventListener('mouseenter', () => {
            stopAutoSlide(timer);
        });
        slider.value.addEventListener('mouseleave', () => {
            timer = startAutoSlide(time);
        });

        // Это нужно для избежания перемотки на большое расстояние когда вкладка неактивна
        window.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                stopAutoSlide(timer)
            } else {
                timer = startAutoSlide(time)
            }
        })
    });

    function mapItems(itemsRef) {
        itemsRef.value = [itemsRef.value[itemsRef.value.length - 1], ...itemsRef.value, itemsRef.value[0]];
    };
    function disableTransition() {
        itemContainer.value.classList.add('slider__item-container_no-transition');
    }
    function enableTransition() {
        // TODO если возможно, переделать без setTimeout
        // Не знаю как сделать по-другому так, чтобы класс убирался по завершении вычислений computed свойств
        setTimeout(() => {
            itemContainer.value.classList.remove('slider__item-container_no-transition')
        });
    }

    function update() {
        disableTransition();
        sliderWidth.value = itemContainer.value.offsetWidth;
        enableTransition();
    }
    function tryReset() {
        if (currentPos.value > lastIndex) {
            disableTransition();
            slideTo(firstIndex);
            enableTransition();
        }
        if(currentPos.value < firstIndex) {
            disableTransition();
            slideTo(lastIndex);
            enableTransition();
        }
    }
    function slideTo(index) {
        currentPos.value = index;
    }
    function slideNext() {
        if (inTransition) {
            return
        }
        slideTo(currentPos.value + 1);
    }
    function slidePrev() {
        if (inTransition) {
            return
        }
        slideTo(currentPos.value - 1);
    }
    function startAutoSlide(time) {
        return setInterval(() => {
            slideNext()
        }, time)
    }
    function stopAutoSlide(timerId) {
        clearInterval(timerId)
    }
</script>

<style scoped lang="scss">
    .slider {
        position: relative;
        padding: 60px 60px;

        overflow: hidden;

        &__item-container {
            display: flex;
            transition: transform 0.8s;

            &_no-transition {
                transition: none;
            }
        }

        &__item {
            flex-shrink: 0;

            display: flex;
            align-items: center;
            gap: 80px;
            width: 100%;

            margin-left: 100px;

            transform: translate(-100px);
        }

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

        &__slide {
            cursor: pointer;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: transparent;
            border: none;
            z-index: 1;

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