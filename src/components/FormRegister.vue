<template>
    <form class="register form" action="/api/register" method="post">
        <div class="register__title form-title">Регистрация</div>
        <div class="register__subtitle">Уже есть аккаунт?</div>
        <div class="register__sign-in">Войти</div>
        <div class="register__content">
            <VInput type="text" name="name">Полное имя</VInput>
            <VInput type="email" name="email">Email</VInput>
            <VInput type="password" name="password">Пароль</VInput>
            <VInputCheckbox class="register__checkbox">
                Согласен с Политикой конфиденциальности
            </VInputCheckbox>
            <VButton class="register__button" variant="accent" type="submit">
                Зарегистрироваться
            </VButton>
        </div>
    </form>
</template>

<script setup>
    import VInputCheckbox from "@components/VInputCheckbox.vue";
    import VInput from "@components/VInput.vue";
    import VButton from "@components/VButton.vue";

    function submitForm() {
        if (policyChecked.value) {
            console.log("Отправлено");
        }
    }
</script>

<style lang="scss" scoped>
    .register {
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
