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
    import apis from '/src/apis.json';
    import { ref } from 'vue';
    import type { IReview, Res } from '/src/pages/index';

    const isLoading = ref(true);
    const reviews = ref<IReview[]>([]);

    fetch(apis.reviews + '?count=5')
    .then(res => res.json())
    .then((json: Res<IReview[]>) => {
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