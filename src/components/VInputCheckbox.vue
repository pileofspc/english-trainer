<template>
    <label class="checkbox">
        <input class="checkbox__input" type="checkbox">
        <div class="checkbox__box">
            <svg class="checkbox__checkmark" >
                <use :href="`#${Checkmark.id}`"></use>
            </svg>
        </div>
        <span class="checkbox__label-text">
            <slot></slot>
        </span>
    </label>
</template>

<script setup>
    import Checkmark from '@images/icons/Checkmark.svg?sprite';
</script>

<style lang="scss" scoped>
    .checkbox {
        --color: var(--c-accent);

        display: flex;
        align-items: center;
        cursor: pointer;

        &__box {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 24px;
            height: 24px;
            margin-right: 8px;

            border: 1px solid var(--c-shade);
            border-radius: 4px;
        }

        &__label-text {
            font-size: 16px;
            font-weight: 400;
        }

        &__checkmark {
            display: none;
            color: var(--color);
        }

        &__input {
            display: none;
        }

        &__input:checked ~ &__box {
            border: 2px solid var(--color);

            .checkbox__checkmark {
                display: block;
            }
        }
    }
</style>