<template>
    <div class="trainer block">
        <VProgress
            class="trainer__progress"
            value="0.5"
        />
        <div class="trainer__word"></div>
        <div class="trainer__task"></div>
        <div class="trainer__controls">
            <VButtonBright text="Не верно"></VButtonBright>
            <VButtonAccent text="Верно"></VButtonAccent>
        </div>
    </div>
</template>

<script setup>
    import VButtonBright from '@components/VButtonBright.vue';
    import VButtonAccent from '@components/VButtonAccent.vue';
    import VProgress from "@components/VProgress.vue";
    import VButton from '@components/VButton.vue';
</script>

<style lang="scss" scoped></style>