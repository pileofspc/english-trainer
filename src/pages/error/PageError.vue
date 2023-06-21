<template>
    <LayoutCentered>
        <div class="error">
            <svg class="error__svg">
                <use :href="`#${ErrorImage.id}`"></use>
            </svg>
            <div class="error__message">Такой страницы не существует</div>
            <div class="error__buttons">
                <VButton
                    variant="bright"
                    @click="router.back()"
                    style="font-size: 16px"
                    >На предыдущую</VButton
                >
                <RouterLink :to="{ name: 'PageMain' }">
                    <VButton variant="accent" style="font-size: 16px"
                        >На главную</VButton
                    >
                </RouterLink>
            </div>
        </div>
    </LayoutCentered>
</template>

<script setup lang="ts">
    import LayoutCentered from "@components/LayoutCentered.vue";
    import VButton from "@components/VButton.vue";
    import { useRouter } from "vue-router";

    import ErrorImage from "@images/Error.svg?sprite";

    const router = useRouter();
</script>

<style lang="scss" scoped>
    .error {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--c-primary);

        padding: 24px;

        &__svg {
            width: 100%;
            height: 240px;
            color: var(--c-muted);
        }

        &__message {
            margin-top: 32px;
            font-family: "Montserrat";
            font-size: 32px;
        }

        &__buttons {
            margin-top: 32px;
            display: flex;
            gap: 24px;
        }
    }
</style>
