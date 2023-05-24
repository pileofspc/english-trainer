<template>
    <div class="pie-chart">
        <div class="pie-chart__chart-container">
            <Doughnut class="pie-chart__chart" :options="chartOptions" :data="chartData" />
        </div>
        <div class="pie-chart__data">
            <div class="pie-chart__item" v-for="(item, index) in data">
                <div class="pie-chart__item-square" :style="{backgroundColor: Chart.defaults.backgroundColor[index]}"></div>
                <div class="pie-chart__item-percentage">{{ `${getPercentage(item.value, sum)}` }}</div>
                <div class="pie-chart__item-text">{{ `${item.name}` }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref } from "vue";
    import { Doughnut } from 'vue-chartjs';
    import { Chart, PieController, ArcElement, Tooltip } from 'chart.js';

    Chart.register(PieController, ArcElement, Tooltip);

    const rootStyle = getComputedStyle(document.documentElement);
    Chart.defaults.backgroundColor = [
        rootStyle.getPropertyValue('--c-accent'),
        rootStyle.getPropertyValue('--c-success'),
        rootStyle.getPropertyValue('--c-error'),
        rootStyle.getPropertyValue('--c-warning'),
        rootStyle.getPropertyValue('--c-secondary'),
    ];

    const props = defineProps({
        // Массив объектов вида [{name, value}, {name, value}]
        data: {
            type: Array,
            required: false,
        }
    })

    const data = ref(
        [
            { name: 'Создавать', value: 5000},
            { name: 'Творить', value: 4000},
            { name: 'Делать', value: 3000},
            { name: 'Созидать', value: 2000},
            { name: 'Вызывать', value: 1000},
        ]
    );
    const names = computed(() => data.value.map(item => item.name));
    const values = computed(() => data.value.map(item => item.value));
    const sum = computed(() => values.value.reduce( (sum, el) => sum + el ));


    const chartData = computed( () => {
        return {
            labels: names.value,
            datasets: [
                { data: values.value }
            ],
        }
    });
    const chartOptions = ref({
        responsive: true,
        plugins: {
            tooltip: {
                boxPadding: 6,
                callbacks: {
                    label(context) {
                        return getPercentage(context.parsed, sum.value)
                    }
                }
            },
        },
        animation: {
            animateRotate: true,
            duration: 1000,
            easing: 'easeOutQuad'
        }
    })

    function getPercentage(value, total) {
        return `${Math.round(value / total * 100)}%`
    }
</script>

<style lang="scss" scoped>

    .pie-chart {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;

        &__chart-container {
            width: 200px;
        }

        &__data {
            margin-left: auto;
            margin-right: auto;
        }

        &__item {
            display: flex;
            align-items: center;
            font-size: 14px;
        }

        &__item:not(:first-child) {
            margin-top: 8px;
        }

        &__item-square {
            flex-shrink: 0;
            width: 20px;
            height: 20px;
            border-radius: 4px;
        }

        &__item-percentage {
            margin-left: 8px;
        }

        &__item-text {
            margin-left: 4px;
        }
    }
</style>