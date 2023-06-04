<template>
    <LayoutDefault>
        <component
            class="page-train__trainer"
            :is="chosenVariant.component"
            v-bind="chosenVariant.from && { from: chosenVariant.from }"
        />
    </LayoutDefault>
</template>

<script setup lang="ts">
    import LayoutDefault from "@components/LayoutDefault.vue";
import TrainerRightWrong from "@modules/TrainerRightWrong/TrainerRightWrong.vue";
import TrainerWithOptions from '@modules/TrainerWithOptions/TrainerWithOptions.vue';
import type { IBreadcrumbItem } from "@types";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import apis from '/src/apis.json';
import { useBreadcrumbsStore } from "/src/stores/storeBreadcrumbs";

    const route = useRoute();

    const variantMap = new Map();
    variantMap.set('train', {
        component: TrainerRightWrong,
        displayName: 'Верно не верно'
    });
    variantMap.set('train-eng-rus', {
        component: TrainerWithOptions,
        from: 'eng',
        displayName: 'C английского на русский'
    });
    variantMap.set('train-rus-eng', {
        component: TrainerWithOptions,
        from: 'rus',
        displayName: 'С русского на английский'
    });

    const chosenVariant = variantMap.get(route.params.trainingType);

    const bcstore = useBreadcrumbsStore();
    const displayName1 = ref('');
    const breadCrumbs = computed<IBreadcrumbItem[]>(() => [
        { 
            displayName: 'Главная', 
            to: { 
                name: 'PageMain', 
                replace: true 
            } 
        },
        {
            displayName: displayName1.value,
            to: {
                name: 'PageWordSet',
                params: {
                    wordSetId: route.params.wordSetId
                }
            }
        },
        {
            displayName: chosenVariant.displayName
        }
    ])

    watch(breadCrumbs, () => {
        bcstore.breadcrumbs = breadCrumbs.value
    })

    fetch(apis.wordset + '?id=fruits')
    .then(res => res.json())
    .then(res => displayName1.value = res.title)
</script>

<style lang="scss" scoped></style>