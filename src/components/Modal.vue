<template>
    <Teleport to="body">
        <div class="modal" @click.self="emit('close')">
            <slot></slot>
        </div>
    </Teleport>
</template>

<script setup>
    import {onMounted, onUnmounted} from "vue";

    const emit = defineEmits(['close']);

    onMounted(() => {
        document.body.style.overflow = 'hidden';
    })

    onUnmounted(() => {
        document.body.style.overflow = '';
    })
</script>

<style lang="scss" scoped>
    .modal {
        z-index: 5;
        background-color: var(--c-transparent);
        position: fixed;
        inset: 0;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>