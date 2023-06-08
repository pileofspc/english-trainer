<template>
    <div class="reviews block" v-if="!isLoading">
        <Review
            v-for="item in reviews"
            :img-path="item.img"
            :author="item.name"
            :text="item.review"
        />
    </div>
</template>

<script setup lang="ts">
    import Review from "@components/Review.vue";
    import apis from "/src/api";
    import { ref } from "vue";
    import type { ReviewsJson, IReview } from "@types";

    const isLoading = ref(true);
    const reviews = ref<IReview[]>([]);
    const count = 5;

    fetch(apis.reviews + "?count=" + count)
        .then((res) => res.json())
        .then((json: ReviewsJson) => {
            reviews.value = json.data;
            isLoading.value = false;
        });
</script>

<style lang="scss" scoped>
    .reviews {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        justify-content: center;
        gap: 24px;
        padding: 24px;
    }
</style>
