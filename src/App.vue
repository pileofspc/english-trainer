<template>
    <router-view></router-view>
</template>

<style lang="scss">
    .app-wrapper {
        //display: grid;
        //padding-top: var(--wrapper-pt);
        //grid-template-rows: auto 1fr auto;
        //min-height: 100vh;
        //min-height: 100dvh;

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