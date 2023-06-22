<template>
    <LayoutDefault>
        <div class="page-contacts__first-row">
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
    import useBreadcrumbs from "/src/composables/useBreadcrumbs";

    useBreadcrumbs(() => [
        { displayName: "Главная", to: { name: "PageMain" } },
        { displayName: "Контакты" },
    ]);
</script>

<style lang="scss" scoped>
    @use "@styles/mixins" as m;
    .page-contacts {
        &__first-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
        }
    }

    @include m.respondSimple("sm") {
        .page-contacts {
            &__first-row {
                grid-template-columns: auto;
            }
        }
    }
</style>
