<template>
    <form class="feedback block" @submit.prevent="submit">
        <ModalBlock
            v-if="showModal"
            @close="showModal = false"
            title="Обратная связь"
        >
            {{ message }}
        </ModalBlock>
        <div>
            <div class="feedback__header">Форма обратной связи</div>
            <div class="feedback__description">
                Как правило, наша команда отвечает в течение 24-28 часов.
            </div>
        </div>
        <InputDefault name="name" label="Имя*" />
        <InputDefault name="email" label="Почта*" />
        <InputDefault name="subject" label="Тема*" />
        <TextArea name="message" label="Текст сообщения*" />
        <VButton type="submit" class="feedback__button" variant="accent">
            Отправить
        </VButton>
    </form>
</template>

<script setup lang="ts">
    import ModalBlock from "@components/ModalBlock.vue";
    import InputDefault from "@modules/Forms/InputDefault.vue";
    import TextArea from "@modules/Forms/TextArea.vue";
    import VButton from "@components/VButton.vue";

    import type { FeedbackJson } from "@types";
    import api from "/src/api";
    import { ref } from "vue";
    import { useForm } from "vee-validate";
    import * as yup from "yup";

    const showModal = ref(false);
    const isFetching = ref(true);
    const message = ref("");

    const schema = yup.object({
        name: yup.string().required(),
        email: yup
            .string()
            .required()
            .email()
            .matches(
                /^[a-z0-9@\._]*$/gi,
                "Поле не должно содержать специальных символов"
            ),
        subject: yup.string().required().min(3),
        message: yup.string().required().min(3),
    });

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

        fetch(api.feedback, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(formDataObject),
        })
            .then((res) => res.json())
            .then((json: FeedbackJson) => {
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
                showModal.value = true;
            });
    }
</script>

<style lang="scss" scoped>
    .feedback {
        display: flex;
        flex-direction: column;
        flex-basis: 50%;
        gap: 30px;
        padding: 40px 30px;

        &__header {
            margin-bottom: 8px;
            font-weight: var(--fw-bold);
            font-size: 30px;
        }

        &__description {
            font-weight: var(--fw-regular);
            font-size: 16px;
        }

        &__field {
            display: flex;
            flex-direction: column;
        }

        &__label {
            font-weight: var(--fw-regular);
            font-size: 16px;
        }

        &__input {
            min-height: 52px;
            border: 1px solid var(--c-shade);
            box-shadow: var(--input-shadow);
            border-radius: 6px;
            transition: border-color 0.1s;

            &:focus {
                border: 1px solid var(--c-accent);
                outline: none;
            }
        }

        &__textarea {
            max-height: 200px;
            min-height: 120px;
            border: 1px solid var(--c-shade);
            box-shadow: var(--input-shadow);
            border-radius: 6px;
            resize: none;
            transition: border-color 0.1s;

            &:focus {
                border: 1px solid var(--c-accent);
                outline: none;
            }
        }

        &__button {
            align-self: flex-start;
        }
    }
</style>
