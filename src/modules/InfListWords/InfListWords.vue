<template>
    <div class="inf-list-words">
        <Container :status="fetchStatus">
            <VCard
                v-for="item in wordSet?.words"
                class="inf-list-words__word"
                :img="item.img"
                :title="item.word"
                :subtitle="item.translation"
            />
        </Container>
    </div>
</template>

<script setup lang="ts">
    import VCard from "@components/VCard.vue";
    import api from "/src/api";
    import type { IWordSet } from "@types";
    import { useRoute } from "vue-router";
    import useFetch from "/src/composables/useFetch";

    const route = useRoute();

    const { fetchedData, fetchStatus } = useFetch<IWordSet>({
        api: `${api.wordset}?id=${route.params.wordSetId}&full=true`,
    });

    const wordSet = fetchedData;
</script>

<style scoped lang="scss">
    .inf-list-words {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
        gap: 20px;

        &__word {
            width: auto;
            height: auto;
        }
    }
</style>
