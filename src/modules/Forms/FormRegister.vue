<template>
    <form class="register form" @submit.prevent="submit">
        <div class="register__title form-title">Регистрация</div>
        <div class="register__subtitle">Уже есть аккаунт?</div>
        <a class="register__log-in" @click.prevent="emit('login')">Войти</a>
        <div class="register__content">
            <InputDefault type="text" name="name" label="Полное имя*" />
            <InputDefault type="email" name="email" label="Email*" />
            <InputPassword type="password" name="password" label="Пароль*" />
            <InputCheckbox
                class="register__checkbox"
                label="Согласен с Политикой конфиденциальности"
                name="policy"
            />
            <VButton class="register__button" variant="accent" type="submit">
                Зарегистрироваться
            </VButton>
        </div>
    </form>
</template>

<script setup lang="ts">
    import InputCheckbox from "@modules/Forms/InputCheckbox.vue";
    import InputDefault from "@modules/Forms/InputDefault.vue";
    import InputPassword from "@modules/Forms/InputPassword.vue";
    import VButton from "@components/VButton.vue";

    import { useForm } from "vee-validate";
    import * as yup from "yup";
    import api from "/src/api";
    import type { RegisterJson } from "@types";
    import { ref } from "vue";

    const emit = defineEmits(["login"]);

    const schema = yup.object({
        name: yup.string().required().min(4),
        email: yup
            .string()
            .required()
            .email()
            .matches(
                /^[a-z0-9@\._]*$/gi,
                "Поле не должно содержать специальных символов"
            ),
        password: yup.string().required().min(8),
        policy: yup
            .boolean()
            .default(false)
            .isTrue(
                "Для регистрации необходимо принять Политику Конфиденциальности"
            ),
    });

    const isFetching = ref(true);
    const message = ref("");

    const { meta, validate } = useForm({
        validationSchema: schema,
    });

    async function submit(e: Event) {
        if (!meta.value.valid) {
            validate();
            return;
        }

        const formDataObject = Object.fromEntries(
            new FormData(e.currentTarget as HTMLFormElement)
        );

        fetch(api.register, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(formDataObject),
        })
            .then((res) => res.json())
            .then((json: RegisterJson) => {
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

        &__log-in {
            cursor: pointer;
            transition: color 0.2s ease;
            color: var(--c-muted);

            &:hover {
                color: var(--c-accent);
            }
        }
    }
</style>
