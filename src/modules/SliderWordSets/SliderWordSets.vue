<template>
    <div
        class="slider slider_cards block"
        @mouseenter="stopAutoSlide()"
        @mouseleave="startAutoSlide(time)"
        v-resizer="update"
    >
        <button class="slider__slide slider__slide_left" @click="slidePrev">
            <svg class="slider__slide-svg">
                <use :href="`#${ChevronLeft.id}`"></use>
            </svg>
        </button>


        <div
            class="slider__item-container"
            ref="itemContainer"
            :style="{ transform: `translate(${currentX}px)`}"
        >
            <WordSet v-for="item in sliderItems"
                   v-bind="item"
                   class="slider__item">
            </WordSet>
        </div>


        <button class="slider__slide slider__slide_right" @click="slideNext">
            <svg class="slider__slide-svg">
                <use :href="`#${ChevronRight.id}`"></use>
            </svg>
        </button>
    </div>
</template>

<script setup>
    import WordSet from '@modules/WordSet/WordSet.vue';
    import ChevronLeft from '@images/icons/ChevronLeft.svg?sprite';
    import ChevronRight from '@images/icons/ChevronRight.svg?sprite';
    import { computed, onBeforeUnmount, onMounted, ref } from "vue";


    const sliderItems = ref([
        {
            id: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 111',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            id: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 222',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            id: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 333',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            id: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 444 asdasd dfsgds fdsg',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            id: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 555',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            id: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 666',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            id: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 777',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            id: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 888',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
        {
            id: 'hello',
            imgPath: '/static/cat_640x640.jpg',
            title: 'Животные 999',
            description: 'Dolor felis venenatis homero sapientem litora porttitor non epicuri consul. Mauris vituperata reformidans accumsan eos laudem moderatius mediocrem. Altera homero assueverit graeci salutatus molestie.',
        },
    ]);


    mapItems(sliderItems);

    let timer;
    const time = 5000;
    let inTransition = false;
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
        startAutoSlide(time);
        // Это нужно для избежания перемотки на большое расстояние когда вкладка неактивна
        window.addEventListener('visibilitychange', onTabChange);
    });

    onBeforeUnmount(() => {
        stopAutoSlide();
        window.removeEventListener('visibilitychange', onTabChange);
    });


    function onTabChange(e) {
        if (document.visibilityState === 'hidden') {
            stopAutoSlide(timer)
        } else {
            startAutoSlide(time)
        }
    }
    function update() {
        sliderWidth.value = itemContainer.value.offsetWidth;
    }
    function tryReset() {
        if (currentPos.value > lastIndex) {
            slideFastTo(firstIndex);
        }
        if(currentPos.value < firstIndex) {
            slideFastTo(lastIndex);
        }
    }

    function slideFastTo(index) {
        disableTransition();
        currentPos.value = index;
    }
    function slideTo(index) {
        if (inTransition) {
            return
        }
        enableTransition();
        currentPos.value = index;
        inTransition = true;
        addSelfRemovingListeners();
    }
    function slideNext() {
        slideTo(currentPos.value + 1);
    }
    function slidePrev() {
        slideTo(currentPos.value - 1);
    }
    function startAutoSlide(time) {
        if (timer) {
            return
        }

        timer = setInterval(() => {
            slideNext()
        }, time)
    }
    function stopAutoSlide() {
        clearInterval(timer);
        timer = null;
    }
    function mapItems(itemsRef) {
        itemsRef.value = [itemsRef.value[itemsRef.value.length - 1], ...itemsRef.value, itemsRef.value[0]];
    }
    function disableTransition() {
        itemContainer.value.classList.remove('slider__item-container_transition')
    }
    function enableTransition() {
        itemContainer.value.classList.add('slider__item-container_transition');
    }
    function addSelfRemovingListeners() {
        let afterTransition = (e) => {
            if (e.target === itemContainer.value) {
                disableTransition()
                inTransition = false;
                tryReset();

                itemContainer.value.removeEventListener('transitionend', afterTransition);
                itemContainer.value.removeEventListener('transitioncancel', afterTransition);
            }
        };
        itemContainer.value.addEventListener('transitionend', afterTransition);
        itemContainer.value.addEventListener('transitioncancel', afterTransition);
    }
</script>

<style scoped lang="scss">
    .slider {
        position: relative;
        padding: 32px 60px;

        overflow: hidden;

        &__item-container {
            display: flex;

            &_transition {
                transition: transform 0.8s;
            }
        }

        &__item {
            flex-shrink: 0;
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