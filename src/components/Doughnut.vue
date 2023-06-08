<template>
    <div class="pie-chart">
        <div class="pie-chart__chart-container">
            <Doughnut
                class="pie-chart__chart"
                :options="chartOptions"
                :data="chartData"
            />
        </div>
        <div class="pie-chart__data">
            <div class="pie-chart__item" v-for="(item, index) in props.items">
                <div
                    class="pie-chart__item-square"
                    :style="{ backgroundColor: colors[index] }"
                ></div>
                <div class="pie-chart__item-percentage">
                    {{ `${getPercentage(item?.value, sum)}` }}
                </div>
                <div class="pie-chart__item-text">{{ `${item?.name}` }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    // @ts-nocheck
    // ПРИ ВНЕСЕНИИ ИЗМЕНЕНИЙ УБРАТЬ @ts-nocheck!
    // Перед сохранением добавить @ts-nocheck!
    // В типах ChartJS ошибка, или я что-то не понял. ТС ругается на то, что я передаю массив colors, а не строку, хотя всё прекрасно работает и с массивом.
    // Так как ошибку показывает в темплейте, и я не знаю как заглушить конкретную ошибку в нем, пришлось отключать проверку для всего файла, а не для конкретной строки.
    import { computed, ref } from "vue";
    import { Doughnut } from "vue-chartjs";
    import { Chart, PieController, ArcElement, Tooltip } from "chart.js";
    import type { PropType } from "vue";
    import type { IDoughnutItem } from "@types";

    const props = defineProps({
        items: {
            type: Array as PropType<IDoughnutItem[] | undefined[]>,
            required: true,
        },
    });

    Chart.register(PieController, ArcElement, Tooltip);

    // Максимум 5 элементов и соответственно 5 цветов
    const rootStyle = getComputedStyle(document.documentElement);
    const colors = [
        rootStyle.getPropertyValue("--c-warning"),
        rootStyle.getPropertyValue("--c-success"),
        rootStyle.getPropertyValue("--c-primary"),
        rootStyle.getPropertyValue("--c-shade"),
        rootStyle.getPropertyValue("--c-graph"),
    ];

    function sliceText(maxChars: number, text: string): string[] | string {
        if (text.length <= maxChars) {
            return text;
        }

        function getSpaceIndex() {
            const before = currentSlice.lastIndexOf(" ", maxChars);
            if (before !== -1) {
                return before;
            }
            return currentSlice.indexOf(" ", maxChars);
        }

        let currentSlice = text;
        let result = [];
        let closestSpaceIndex = getSpaceIndex();
        while (closestSpaceIndex !== -1) {
            result.push(currentSlice.slice(0, closestSpaceIndex));
            currentSlice = currentSlice.slice(closestSpaceIndex + 1);
            closestSpaceIndex = getSpaceIndex();
        }
        if (currentSlice.length > 0) {
            result.push(currentSlice);
        }
        return result;
    }

    const chartOptions = ref({
        responsive: true,
        plugins: {
            tooltip: {
                boxPadding: 6,
                callbacks: {
                    title(context: any) {
                        const label: string = context[0].label;
                        return sliceText(24, label);
                    },
                    label(context: any) {
                        return getPercentage(context.parsed, sum.value);
                    },
                },
            },
            animation: {
                animateRotate: true,
                duration: 1000,
                easing: "easeOutQuad",
            },
        },
    });

    const names = computed(() => props.items.map((item) => item?.name));
    const values = computed(() => props.items.map((item) => item?.value));
    const sum = computed(() =>
        values.value.reduce((sum, el) => (sum || 0) + (el || 0))
    );

    const chartData = computed(() => {
        return {
            labels: names.value,
            datasets: [
                {
                    data: values.value,
                    backgroundColor: colors,
                },
            ],
        };
    });

    function getPercentage(value: number = 0, total: number = 0) {
        return `${Math.round((value / total) * 100)}%`;
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
