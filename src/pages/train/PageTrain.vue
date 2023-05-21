<template>
    <LayoutDefault>
        <TrainerWithOptions class="page-train__trainer"></TrainerWithOptions>
        <TrainerYesNo class="page-train__trainer"></TrainerYesNo>
    </LayoutDefault>
</template>

<script setup>
    import TrainerWithOptions from '@modules/TrainerWithOptions/TrainerWithOptions.vue';
    import LayoutDefault from "@components/LayoutDefault.vue";
    import TrainerYesNo from "@modules/TrainerYesNo/TrainerYesNo.vue";
</script>

<style lang="scss" scoped></style>