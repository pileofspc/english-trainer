<template>
    <div class="form-field">
        <input class="form-field__input"
               :id="id"
               :type="props.type"
               :name="props.name"
        >
        <label class="form-field__label" :for="id">
            <slot></slot>
        </label>
    </div>
</template>

<script setup>
    import { v4 as uuidv4 } from 'uuid';

    const id = uuidv4();

    const props = defineProps({
        type: {
            type: String
        },
        name: {
            type: String
        }
    })
</script>

<style lang="scss" scoped>
    .form-field {
        display: flex;
        flex-direction: column;
        color: var(--c-secondary);
        font-size: 16px;
        font-weight: var(--fw-semi-bold);

        &__input {
            margin-top: 6px;
            padding: 12px;
            border: none;
            outline: 1px solid var(--c-shade);
            border-radius: 6px;
            font-weight: var(--fw-regular);

            transition: outline-color 0.2s;
        }

        &__input:focus {
            outline-color: var(--c-accent);

            + .form-field__label {
                color: var(--c-accent);
            }
        }

        &__label {
            transition: color 0.2s;
            order: -1;
        }
    }
</style>