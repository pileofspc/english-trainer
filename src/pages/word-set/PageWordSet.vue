<template>
    <LayoutDefault>
        <Container :status="fetchStatus" redirect>
            <WordSetHeader v-bind="wordSet" />
            <TrainLinks class="page-theme__train-links" />
            <InfListWords class="page-theme__words" :items="cardItems" />
        </Container>
    </LayoutDefault>
</template>

<script setup lang="ts">
    import LayoutDefault from "@components/LayoutDefault.vue";
    import InfListWords from "@modules/InfListWords/InfListWords.vue";
    import TrainLinks from "@modules/TrainLinks/TrainLinks.vue";
    import WordSetHeader from "@modules/WordSetHeader/WordSetHeader.vue";

    import { useBreadcrumbsStore } from "@stores/storeBreadcrumbs";
    import type { IBreadcrumb, IWordSet, IVCard } from "@types";
    import { computed, watch } from "vue";
    import { useRoute } from "vue-router";
    import useFetch from "@composables/useFetch";
    import api from "/src/api";
    import { useGeneralStore } from "/src/stores/storeGeneral";

    const genStore = useGeneralStore();

    const route = useRoute();

    const { fetchedData, fetchStatus } = useFetch<IWordSet>({
        api: `${api.wordset}?id=${route.params.wordSetId}`,
    });

    const wordSet = fetchedData;
    const cardItems = computed<IVCard[]>(() => {
        return (
            wordSet.value?.words?.map((word) => ({
                img: word.img,
                title: word.word,
                subtitle: word.translation,
            })) || []
        );
    });

    const breadCrumbs = computed<IBreadcrumb[]>(() => {
        return [
            { displayName: "Главная", to: { name: "PageMain", replace: true } },
            {
                displayName: "Наборы слов",
                to: { name: "PageWordSets", replace: true },
            },
            {
                displayName:
                    wordSet.value?.title ||
                    genStore.displayName ||
                    "Текущий набор",
            },
        ];
    });

    const bcstore = useBreadcrumbsStore();
    // вотчер вместо присваивания компьютед свойства нужен, чтобы избежать ошибки типов
    bcstore.setBreadcrumbs(breadCrumbs.value);
    watch(breadCrumbs, () => {
        bcstore.breadcrumbs = breadCrumbs.value;
    });
</script>

<style scoped lang="scss">
    .page-theme {
        &__words {
            margin-top: var(--mt-big);
        }

        &__train-links {
            margin-top: var(--mt-big);
        }
    }
</style>
