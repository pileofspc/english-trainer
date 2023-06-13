<template>
    <LayoutDefault>
        <div class="page__first-row">
            <Contacts />
            <FormFeedback />
        </div>
        <Map />
    </LayoutDefault>
</template>

<script setup lang="ts">
    import LayoutDefault from "@components/LayoutDefault.vue";
    import Contacts from "@components/Contacts.vue";
    import FormFeedback from "@modules/Forms/FormFeedback.vue";
    import Map from "@components/Map.vue";
    import type { IBreadcrumb } from "@types";
    import { useBreadcrumbsStore } from "/src/stores/storeBreadcrumbs";

    const breadcrumbs: IBreadcrumb[] = [
        { displayName: "Главная", to: { name: "PageMain" } },
        { displayName: "Контакты" },
    ];

    const bcstore = useBreadcrumbsStore();
    bcstore.breadcrumbs = breadcrumbs;
</script>

<style lang="scss" scoped>
    .page {
        &__first-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
        }
    }
</style>
