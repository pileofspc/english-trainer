<template>
    <div
        class="trainer-option"
        :class="{
            'trainer-option_chosen-correct': props.status === 'chosen-correct',
            'trainer-option_chosen-incorrect':
                props.status === 'chosen-incorrect',
            'trainer-option_correct': props.status === 'correct',
        }"
    >
        <div class="trainer-option__main input">
            <span class="trainer-option__value">{{ props.word }}</span>
        </div>
        <div
            class="trainer-option__status"
            v-if="
                props.status === 'chosen-incorrect' ||
                props.status === 'chosen-correct'
            "
        >
            <svg class="trainer-option__status-svg">
                <use :href="`#${statusIcon.id}`"></use>
            </svg>
            <span class="trainer-option__status-text">{{ statusText }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from "vue";

    import Checkmark from "@images/icons/Checkmark.svg?sprite";
    import Cross from "@images/icons/Cross.svg?sprite";
    import type { PropType } from "vue";
    import type { OptionStatus } from "@types";

    const props = defineProps({
        word: {
            type: String,
            required: true,
        },
        status: {
            type: String as PropType<OptionStatus>,
        },
    });

    const statusText = computed(() =>
        props.status === "chosen-correct" ? "Правильно" : "Неправильно"
    );
    const statusIcon = computed(() =>
        props.status === "chosen-correct" ? Checkmark : Cross
    );
</script>

<style lang="scss" scoped>
    .trainer-option {
        position: relative;

        &__main {
            font-size: 20px;
            text-align: center;
            cursor: pointer;
        }

        &__number {
            display: inline-block;
        }

        &__value {
            margin-left: 8px;
        }

        &__status {
            position: absolute;
            right: -16px;
            top: 50%;
            transform: translate(100%, -50%);

            display: flex;
            align-items: center;
        }

        &__status-svg {
            width: 24px;
            height: 24px;
        }

        &__status-text {
            margin-left: 4px;
            font-size: 14px;
        }
    }

    .trainer-option {
        &_correct {
            .trainer-option__main {
                color: var(--c-bright);
                background-color: var(--c-success);
            }
        }

        &_chosen-correct {
            .trainer-option__main {
                outline-width: 2px;
                outline-color: var(--c-success);
            }

            .trainer-option__status-svg {
                color: var(--c-success);
            }
        }

        &_chosen-incorrect {
            .trainer-option__main {
                outline-width: 2px;
                outline-color: var(--c-error);
            }

            .trainer-option__status-svg {
                color: var(--c-error);
            }
        }
    }

    .trainer-option_correct {
        .trainer-option__main {
            border-color: var(--c-success);
        }

        .trainer-option__status-svg {
            color: var(--c-success);
        }
    }

    .trainer-option_incorrect {
        .trainer-option__main {
            border-color: var(--c-error);
        }

        .trainer-option__status-svg {
            color: var(--c-error);
        }
    }
</style>
