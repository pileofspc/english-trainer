<template>
    <div class="inf-list-words">
        <CardWord
            class="inf-list-words__word"
            v-for="word in props.words"
            v-bind="word"
        />
    </div>
</template>

<script setup lang="ts">
    import CardWord from "@modules/CardWord/CardWord.vue";
    import type { IWordShallow } from "@types";
    import type { PropType } from "vue";

    const props = defineProps({
        wordSetId: String,
        words: {
            type: Array as PropType<IWordShallow[] | undefined[]>,
        },
    });
</script>

<style scoped lang="scss">
    .inf-list-words {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 20px;

        &__word {
            width: auto;
            height: auto;
        }
    }
</style>
