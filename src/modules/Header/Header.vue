<template>
    <header class="header">
        <Modal v-if="showRegisterModal" @close="closeModals">
            <FormRegister />
        </Modal>
        <Modal v-if="showLoginModal" @close="closeModals">
            <FormLogin />
        </Modal>
        <div class="_container">
            <div class="header__inner block">
                <a href="/" class="header__logo">
                    <img class="header__logo-img" :src="mainLogo"
                         alt="Логотип verbify">
                </a>
                <nav class="header__nav">
                    <a class="header__link" href="/">Главная</a>
                    <a class="header__link" href="/about.html">О нас</a>
                    <a class="header__link" href="/cards.html">Контакты</a>
                </nav>

                <VButton class="header__first-button"
                         variant="bright"
                         @click="showRegisterModal = true"
                >
                    Регистрация
                </VButton>

                <VButton variant="accent"
                         @click="showLoginModal = true"
                >
                    Войти
                </VButton>
            </div>
        </div>
    </header>
</template>

<script setup>
    import { ref } from "vue";

    import VButton from '@components/VButton.vue'
    import mainLogo from '@images/main-logo.svg';
    import Modal from '@components/Modal.vue';
    import FormRegister from '@components/FormRegister.vue';
    import FormLogin from '@components/FormLogin.vue';

    const showRegisterModal = ref(true);
    const showLoginModal = ref(false);

    function closeModals() {
        showLoginModal.value = false;
        showRegisterModal.value = false;
    }
</script>

<style lang="scss" scoped>
    @use '@styles/mixins' as m;

    .header {
        font-size: 16px;
        font-weight: 400;

        &__inner {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
        }

        &__logo {
            margin-left: 16px;
        }

        &__logo-img {
            height: 40px;
        }

        &__nav {
            display: flex;
            gap: 24px;
            margin-left: min(5%, 60px);
        }

        &__link {
            min-width: max-content;

            &:hover {
                color: var(--c-accent);
            }
        }

        &__first-button {
            margin-left: auto;
        }
    }
</style>