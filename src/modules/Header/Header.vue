<template>
    <header class="header">
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
                <VButtonBright text="Регистрация" style="margin-left: auto;"></VButtonBright>
                <VButtonAccent text="Войти"></VButtonAccent>
            </div>
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
            box-sizing: content-box;
            padding: 12px;

            //border-radius: 8px;
            //background-color: var(--header);
            //box-shadow: var(--block-shadow);
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
    }
</style>