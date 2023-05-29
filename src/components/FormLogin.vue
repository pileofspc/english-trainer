<template>
    <form class="login form" action="/api/login" method="post">
        <div class="login__title form-title">Авторизация</div>
        <div class="login__subtitle">Еще нет аккаунта?</div>
        <div class="login__sign-in">Зарегистрироваться</div>
        <div class="login__content">
            <VInput type="email" name="email">Email</VInput>
            <VInput type="password" name="password">Пароль</VInput>
            <VButton class="login__button"
                     variant="accent"
                     type="submit"
            >
                Войти
            </VButton>
        </div>
    </form>
</template>

<script setup>
    import VInput from '@components/VInput.vue';
    import VButton from '@components/VButton.vue';

    function submitForm() {
        if (policyChecked.value) {
            console.log('Отправлено')
        }
    }
</script>

<style lang="scss" scoped>
    .login {
        width: 460px;

        &__subtitle {
            margin-top: 8px;
        }

        &__content {
            margin-top: 24px;
            display: flex;
            flex-direction: column;
            gap: 24px;
        }

        &__button {
            font-size: 16px;
            padding: 16px;
        }
    }
</style>