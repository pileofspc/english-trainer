<template>
    <button
        class="button"
        :class="{
            [`button_${props.variant}`]: true,
            button_inactive: props.inactive,
        }"
        :disabled="props.inactive"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
    import type { PropType } from "vue";
    import type { VButton } from "@types";

    const props = defineProps({
        variant: {
            type: String as PropType<VButton>,
        },
        inactive: Boolean,
    });
</script>

<style scoped lang="scss">
    .button {
        font-size: 14px;
        font-weight: 500;
        padding: 8px 28px;

        border: none;
        box-shadow: var(--card-shadow);
        border-radius: 6px;
        cursor: pointer;

        &_accent {
            color: var(--c-bright);
            background-color: var(--c-accent);
            border: 1px solid var(--c-accent);
        }

        &_bright {
            color: var(--c-muted);
            background-color: var(--c-bright);
            border: 1px solid var(--c-shade);
        }

        &_error {
            color: var(--c-bright);
            background-color: var(--c-error);
            border: 1px solid var(--c-error);
        }

        &_success {
            color: var(--c-bright);
            background-color: var(--c-success);
            border: 1px solid var(--c-success);
        }

        &_inactive {
            filter: grayscale(1) opacity(0.2);
            cursor: not-allowed;
        }
    }
</style>
