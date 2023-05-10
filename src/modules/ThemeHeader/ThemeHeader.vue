<template>
    <div class="theme-header block">
            <div class="theme-header__theme">
                <div class="theme-header__img-container block">
                    <img class="theme-header__img" :src="theme.imgPath" :alt="theme.title">
                </div>
                <div class="theme-header__data">
                    <div class="theme-header__title">{{ theme.title }}</div>
                    <div class="theme-header__description">{{ theme.description }}</div>
                    <VButtonAccent text="Тренировать слова" class="theme-header__button-learn"></VButtonAccent>
                </div>
            </div>
    </div>
</template>

<script setup>
    import VButtonAccent from '@components/UI/VButtonAccent.vue';

    const props = defineProps({
        theme: {
            type: Object,
            required: true
        }
    });

</script>

<style scoped lang="scss"></style>