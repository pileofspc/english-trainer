<template>
    <div class="word-of-day block">
        <div class="word-of-day__title small-block-title">Слово дня</div>
        <div class="word-of-day__word">Create [krēˈāt]</div>
        <div class="word-of-day__main">
            <PieChart></PieChart>
        </div>
    </div>
</template>

<script setup>
    import PieChart from '@components/PieChart.vue';

</script>

<style lang="scss" scoped>
    .word-of-day {
        padding: 12px 20px;
        width: fit-content;

        &__title {
            padding-bottom: 12px;
            border-bottom: 1px solid var(--c-shade);
        }

        &__word {
            margin-top: 8px;
            font-size: 20px;
        }

        &__main {
            margin-top: 8px;
        }
    }
</style>