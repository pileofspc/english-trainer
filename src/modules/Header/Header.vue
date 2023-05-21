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
                <VButton class="button1" variant="bright" text="Регистрация" style="margin-left: auto;"></VButton>
                <VButton variant="accent" text="Войти"></VButton>
            </div>
        </div>
    </header>
</template>

<script setup>
    import VButton from '@components/VButton.vue'
    import mainLogo from '@images/main-logo.svg';
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
    }

    //@include m.respondMax(md) {
    //
    //}
    //
    //@include m.respondMax(min) {
    //
    //}
</style>