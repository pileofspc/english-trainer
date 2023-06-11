<template>
    <form class="form-feedback block" @submit.prevent="submit">
        <ModalBlock
            v-if="showModal"
            @close="showModal = false"
            title="Обратная связь"
        >
            {{ message }}
        </ModalBlock>
        <div>
            <div class="form-feedback__header">Форма обратной связи</div>
            <div class="form-feedback__description">
                Как правило, наша команда отвечает в течение 24-28 часов.
            </div>
        </div>
        <VInput name="name" label="Имя" />
        <VInput name="email" label="Почта" />
        <VInput name="subject" label="Тема" />
        <VTextArea name="message" label="Текст сообщения" />
        <VButton type="submit" class="form-feedback__button" variant="accent">
            Отправить
        </VButton>
    </form>
</template>

<script setup lang="ts">
    import ModalBlock from "@components/ModalBlock.vue";
    import VInput from "@components/VInput.vue";
    import VTextArea from "@components/VTextArea.vue";
    import VButton from "@components/VButton.vue";

    import type { FeedbackJSON } from "@types";
    import api from "/src/api";
    import { ref } from "vue";

    const showModal = ref(false);
    const isFetching = ref(true);
    const message = ref("");

    function submit(e: Event) {
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
            .then((json: FeedbackJSON) => {
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
    .form-feedback {
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
