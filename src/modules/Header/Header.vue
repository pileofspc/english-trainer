<template>
    <header class="header">
        <div class="header__inner _container">
            <img class="header__logo" src="https://raw.githubusercontent.com/pileofspc/english-trainer/features/cards-html/src/assets/images/main-logo.svg"
                 alt="Логотип verbify" >
            <nav class="header__nav">
                <a href="#">Главная</a>
                <a href="#">О нас</a>
                <a href="#">Контакты</a>
            </nav>
            <button class="header__button header__button_sign-in">Регистрация</button>
            <button class="header__button header__button_login">Войти</button>
        </div>
    </header>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .header {
        font-size: 16px;
        font-weight: 400;
        margin-top: 8px;

        &__inner {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            align-items: center;
            min-width: 690px;
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
            margin-left: 90px;
            gap: 25px;
        }

        &__button {
            font-size: 14px;
            font-weight: 500;
            padding: 8px 28px;

            border: none;
            box-shadow: var(--card-shadow);
            border-radius: 3px;
            cursor: pointer;
        }

        &__button_sign-in {
            margin-left: auto;
            color: var(--alternate-button-text-color);
            background-color: var(--alternate-button);
            border: 1px solid #DBE2EA;
        }

        &__button_login {
            color: var(--main-button-text-color);
            background-color: var(--main-button);
        }
    }
</style>