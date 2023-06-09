<template>
    <LayoutDefault v-if="!isLoading">
        <WordSetHeader v-bind="wordSet" />
        <TrainLinks class="page-theme__train-links" />
        <InfListWords class="page-theme__words" :items="cardItems" />
    </LayoutDefault>
</template>

<script setup lang="ts">
    import LayoutDefault from "@components/LayoutDefault.vue";
    import InfListWords from "@modules/InfListWords/InfListWords.vue";
    import TrainLinks from "@modules/TrainLinks/TrainLinks.vue";
    import WordSetHeader from "@modules/WordSetHeader/WordSetHeader.vue";

    import { useBreadcrumbsStore } from "@stores/storeBreadcrumbs";
    import type { IBreadcrumb, IWordSet, IVCard, WordSetJson } from "@types";
    import { computed, ref, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import apis from "/src/api";

    const route = useRoute();
    const router = useRouter();
    const isLoading = ref(true);

    const wordSet = ref<IWordSet>();
    const cardItems = computed<IVCard[]>(() => {
        return (
            wordSet.value?.words?.map((word) => ({
                img: word.img,
                title: word.word,
                subtitle: word.translation,
            })) || []
        );
    });

    const breadCrumbs = computed<IBreadcrumb[]>(() => [
        { displayName: "Главная", to: { name: "PageMain", replace: true } },
        {
            displayName: "Наборы слов",
            to: { name: "PageWordSets", replace: true },
        },
        { displayName: wordSet.value?.title || "" },
    ]);
    const bcstore = useBreadcrumbsStore();
    // вотчер вместо присваивания компьютед свойства нужен, чтобы избежать ошибки типов
    watch(breadCrumbs, () => {
        bcstore.breadcrumbs = breadCrumbs.value;
    });

    fetch(`${apis.wordset}?id=${route.params.wordSetId}`)
        .then((res) => res.json())
        .then((res: WordSetJson) => {
            if (res.status) {
                wordSet.value = res.data;
                isLoading.value = false;
            } else {
                router.replace("/error404");
            }
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
