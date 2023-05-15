<template>
    <div class="progress-bar-counter">
        <div class="progress-bar-counter__container">
            <div class="counter progress-bar-counter__counter">
                <span class="counter__current">{{ props.current }}</span>
                <span class="counter__divider">/</span>
                <span class="counter__total">{{ props.total }}</span>
            </div>
            <ProgressBar
                class="progress-bar-counter__progress"
                :value="props.current / props.total"
            />
        </div>
        <div class="progress-bar-counter__value">{{ `${Math.ceil(props.current / props.total * 100)}%` }}</div>
    </div>
</template>

<script setup>
    import ProgressBar from "@components/ProgressBar.vue";
    import { onBeforeMount } from "vue";

    const props = defineProps({
        current: {
            type: [String, Number],
            required: true
        },
        total: {
            type: [String, Number],
            required: true
        },
    });

    let currentNum = Number(props.current);
    let totalNum = Number(props.total);

    // Validation
    onBeforeMount(() => {
        if (
            currentNum < 0 ||
            totalNum < 0 ||
            totalNum < currentNum
        ) {
            console.error('Invalid properties! Total must be > Current!')
        }
    })
</script>

<style lang="scss" scoped>
    .progress-bar-counter {
        font-size: 20px;

        &__container {
            display: flex;
            align-items: center;
        }

        &__progress {
            margin-left: 12px;
            flex-grow: 1;
        }

        &__counter {

        }

        &__value {
            text-align: center;
        }
    }

    .counter {
        &__current {
            color: var(--c-success);
        }
    }
</style>