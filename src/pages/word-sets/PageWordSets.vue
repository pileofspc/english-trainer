<template>
    <LayoutDefault>
        <InfListWordSets />
    </LayoutDefault>
</template>

<script setup lang="ts">
    import LayoutDefault from "@components/LayoutDefault.vue";
    import InfListWordSets from "@modules/InfListWordSets/InfListWordSets.vue";
    import useBreadcrumbs from "/src/composables/useBreadcrumbs";

    useBreadcrumbs([
        {
            displayName: "Главная",
            to: {
                name: "PageMain",
            },
        },
        {
            displayName: "Наборы слов",
        },
    ]);
</script>

<style lang="scss" scoped></style>
