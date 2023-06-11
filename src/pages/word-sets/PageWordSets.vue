<template>
    <LayoutDefault>
        <InfListWordSets />
    </LayoutDefault>
</template>

<script setup lang="ts">
    import LayoutDefault from "@components/LayoutDefault.vue";
    import InfListWordSets from "@modules/InfListWordSets/InfListWordSets.vue";
    import { useBreadcrumbsStore } from "/src/stores/storeBreadcrumbs";
    import type { IBreadcrumb } from "@types";
    import Contacts from "@components/Contacts.vue";

    const bcstore = useBreadcrumbsStore();
    const breadcrumbs: IBreadcrumb[] = [
        {
            displayName: "Главная",
            to: {
                name: "PageMain",
            },
        },
        {
            displayName: "Наборы слов",
        },
    ];

    bcstore.breadcrumbs = breadcrumbs;
</script>

<style lang="scss" scoped></style>
