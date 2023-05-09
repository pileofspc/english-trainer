<template>
    <header class="header">
        <div class="header__inner">
            <img class="header__logo" :src="mainLogo"
                 alt="Логотип verbify">
            <nav class="header__nav">
                <a class="header__link" href="#">Главная</a>
                <a class="header__link" href="#">О нас</a>
                <a class="header__link" href="#">Контакты</a>
            </nav>
                <VButtonBright text="Регистрация" style="margin-left: auto;"></VButtonBright>
                <VButtonAccent text="Войти"></VButtonAccent>
        </div>
    </header>
</template>

<script setup>
    import VButtonBright from '@components/UI/VButtonBright.vue'
    import VButtonAccent from '@components/UI/VButtonAccent.vue';
    import mainLogo from '@images/main-logo.svg';
</script>

<style lang="scss" scoped>
    .header {
        font-size: 16px;
        font-weight: 400;

        &__inner {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;

            border-radius: 8px;
            background-color: var(--header);
            box-shadow: var(--block-shadow);
        }

        &__logo {
            height: 40px;
            margin-left: 16px;
        }

        &__nav {
            display: flex;
            gap: 25px;
            margin-left: min(6.5%, 90px);
        }

        &__link {
            min-width: max-content;

            &:hover {
                color: red;
            }
        }
    }
</style>