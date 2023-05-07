<template>
    <Header></Header>
    <main>
        <slot></slot>
    </main>
    <Footer></Footer>
</template>

<script setup>
import Header from '@modules/Header/Header.vue';
import Footer from '@modules/Footer/Footer.vue';
</script>

<style lang="scss" scoped>

</style>