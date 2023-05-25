<template>
    <div class="reviews block">
        <Review
            v-for="i in 5"
            img-path="/static/person.jpg"
            author="Владислав"
            text="Equidem disputationi velit perpetua unum gloriatur alienum porro nostra. Curabitur ornatus vero saepe reprehendunt. Constituam omittam postea duo nisl sodales quem splendide epicuri suavitate."
        />
    </div>
</template>

<script setup>
    import Review from '@components/Review.vue';
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