<template>
    <form class="login form" @submit.prevent="submit">
        <div class="login__title form-title">Авторизация</div>
        <div class="login__subtitle">Еще нет аккаунта?</div>
        <a class="login__sign-in" @click.prevent="emit('register')">
            Зарегистрироваться
        </a>
        <div class="login__content">
            <InputDefault type="email" name="email" label="Email" />
            <InputPassword type="password" name="password" label="Пароль" />
            <VButton class="login__button" variant="accent" type="submit">
                Войти
            </VButton>
        </div>
    </form>
</template>

<script setup lang="ts">
    import InputDefault from "@modules/Forms/InputDefault.vue";
    import InputPassword from "@modules/Forms/InputPassword.vue";
    import VButton from "@components/VButton.vue";

    import * as yup from "yup";
    import { ref } from "vue";
    import { useForm } from "vee-validate";
    import api from "/src/api";
    import type { LoginJson } from "@types";

    const emit = defineEmits(["register"]);

    const schema = yup.object({
        email: yup
            .string()
            .required()
            .email()
            .matches(
                /^[a-z0-9@\._]*$/gi,
                "Поле не должно содержать специальных символов"
            ),
        password: yup.string().required().min(8),
    });

    const isFetching = ref(true);
    const message = ref("");

    const { meta, validate } = useForm({
        validationSchema: schema,
    });

    function submit(e: Event) {
        if (!meta.value.valid) {
            validate();
            return;
        }

        const formDataObject = Object.fromEntries(
            new FormData(e.currentTarget as HTMLFormElement)
        );

        fetch(api.login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(formDataObject),
        })
            .then((res) => res.json())
            .then((json: LoginJson) => {
                if (!json.status) {
                    throw new Error(json.message);
                }
                message.value = json.message;
            })
            .catch((err) => {
                message.value = err.message;
            })
            .finally(() => {
                isFetching.value = false;
            });
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

        &__sign-in {
            cursor: pointer;
            transition: color 0.2s ease;
            color: var(--c-muted);

            &:hover {
                color: var(--c-accent);
            }
        }
    }
</style>
