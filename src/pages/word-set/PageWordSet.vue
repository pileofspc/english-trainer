<template>
    <LayoutDefault v-if="!isLoading">
        <WordSetHeader v-bind="wordSet" />
        <TrainLinks class="page-theme__train-links" />
        <InfListWords class="page-theme__words" :words="words" :word-set-id="wordSet?.id"/>
    </LayoutDefault>
</template>

<script setup lang="ts">
    import LayoutDefault from '@components/LayoutDefault.vue';
    import InfListWords from '@modules/InfListWords/InfListWords.vue';
    import TrainLinks from "@modules/TrainLinks/TrainLinks.vue";
    import WordSetHeader from '@modules/WordSetHeader/WordSetHeader.vue';

    import { useBreadcrumbsStore } from "@stores/storeBreadcrumbs";
    import { computed, ref, watch } from 'vue';
    import type { IBreadcrumbItem, IWordSet, IWordSimple, Res } from '@types';
    import { useRouter, useRoute } from 'vue-router';
    import apis from '/src/apis.json';


    const route = useRoute();
    const router = useRouter();
    const isLoading = ref(true);

    const wordSet = ref<IWordSet>();
    const words = computed<IWordSimple[]>(() => wordSet.value?.words || []);

    const breadCrumbs = computed<IBreadcrumbItem[]>(() => [
        { displayName: 'Главная' , to: { name: 'PageMain', replace: true }},
        { displayName: wordSet.value?.title || '' },
    ])
    const bcstore = useBreadcrumbsStore();
    watch(breadCrumbs, () => {
        bcstore.breadcrumbs = breadCrumbs.value
    })

    fetch(apis.wordset + '?id=' + route.params.wordSetId)
    .then( (res) => res.json() )
    .then( (res: Res<IWordSet>) => {
        if (res.status) {
            wordSet.value = res.data
            isLoading.value = false
        } else {
            router.replace('/error404')
        }
    })
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