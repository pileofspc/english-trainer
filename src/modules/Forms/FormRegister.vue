<template>
    <form class="register form" action="/api/register" method="post">
        <div class="register__title form-title">Регистрация</div>
        <div class="register__subtitle">Уже есть аккаунт?</div>
        <div class="register__sign-in">Войти</div>
        <div class="register__content">
            <Input type="text" name="name" label="Полное имя" />
            <Input type="email" name="email" label="Email" />
            <Input type="password" name="password" label="Пароль" />
            <InputCheckbox
                class="register__checkbox"
                label="Согласен с Политикой конфиденциальности"
            />
            <VButton class="register__button" variant="accent" type="submit">
                Зарегистрироваться
            </VButton>
        </div>
    </form>
</template>

<script setup lang="ts">
    import InputCheckbox from "@modules/Forms/InputCheckbox.vue";
    import Input from "@modules/Forms/Input.vue";
    import VButton from "@components/VButton.vue";
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
