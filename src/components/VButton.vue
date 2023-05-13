<template>
    <button class="button">{{ props.text }}</button>
</template>

<script setup>
    const props = defineProps({
        text: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: 'accent',
            validator(value) {
                ['acc', 'secondary', 'warning', 'danger'].includes(value)
            }
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

        &_accent {
            color: var(--main-button-text-color);
            background-color: var(--main-button);
            border: 1px solid var(--main-button);
        }
    }
</style>