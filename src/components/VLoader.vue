<template>
    <div class="loader">
        <svg class="loader__svg">
            <use :href="`#${Loader.id}`"></use>
        </svg>
    </div>
</template>

<script setup lang="ts">
    import Loader from "@images/icons/Loader.svg?sprite";
</script>

<style lang="scss" scoped>
    .loader {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;

        &__svg {
            display: block;
            color: var(--c-muted);
            width: 100%;
            height: 100%;
        }
    }
</style>
