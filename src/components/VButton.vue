<template>
    <button class="button" :class="`button_${props.variant}`">{{ props.text }}</button>
</template>

<script setup>
    const props = defineProps({
        text: {
            type: String,
            required: true
        },
        variant: {
            type: String,
            validator(value) {
                return [
                    'accent',
                    'bright',
                    'error',
                    'success'
                ].includes(value)
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
    }
</style>