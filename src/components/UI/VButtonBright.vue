<template>
    <button class="button button_bright">{{ props.text }}</button>
</template>

<script setup>
    const props = defineProps({
        text: {
            type: String,
            required: true
        }
    });
</script>

<style scoped lang="scss">
    .button {
        font-size: 14px;
        font-weight: 500;
        padding: 8px 28px;

        border: none;
        box-shadow: var(--card-shadow);
        border-radius: 3px;
        cursor: pointer;

        &_bright {
            color: var(--alternate-button-text-color);
            background-color: var(--alternate-button);
            border: 1px solid var(--alternate-button-border);
        }
    }
</style>