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
    import Review from '@components/Review.vue';
    import apis from '/src/api';
    import { ref } from 'vue';
    import type { ReviewsJson, Res } from '/src/pages/index';

    const isLoading = ref(true);
    const reviews = ref<ReviewsJson>([]);

    fetch(apis.reviews + '?count=5')
    .then(res => res.json())
    .then((json: Res<ReviewsJson>) => {
        reviews.value = json.data
        isLoading.value = false;
    })
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