<template>
    <div class="form-textarea">
        <textarea
            class="form-textarea__textarea"
            :id="id"
            :name="props.name"
            v-model="value"
        />
        <label class="form-textarea__label" :for="id">{{ props.label }}</label>
        <span class="form-textarea__errors">{{ errorMessage }}</span>
    </div>
</template>

<script setup lang="ts">
    import { v4 as uuidv4 } from "uuid";
    import { useField } from "vee-validate";

    const id = uuidv4();

    const props = defineProps({
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
        },
    });

    const { value, errorMessage } = useField<string>(() => props.name);
</script>

<style lang="scss" scoped>
    .form-textarea {
        display: flex;
        flex-direction: column;
        color: var(--c-secondary);
        font-size: 16px;
        font-weight: var(--fw-semi-bold);

        &__textarea {
            max-height: 200px;
            min-height: 120px;
            resize: none;

            margin-top: 6px;
            padding: 12px;
            border: none;
            outline: 1px solid var(--c-shade);
            border-radius: 6px;
            font-weight: var(--fw-regular);

            transition: outline-color 0.2s;
        }

        &__textarea:focus {
            outline-color: var(--c-accent);

            + .form-textarea__label {
                color: var(--c-accent);
            }
        }

        &__label {
            transition: color 0.2s;
            order: -1;
        }

        &__errors {
            font-size: 12px;
            margin-top: 8px;
            color: var(--c-error);
        }
    }
</style>
