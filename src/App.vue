<template>
    <router-view></router-view>
</template>

<script setup></script>

<style lang="scss">
    .app-wrapper {
        display: flex;
        flex-direction: column;
        padding-top: 8px;
        min-height: 100vh;
        min-height: 100dvh;

        main {
            flex-grow: 1;
        }
    }
</style>
