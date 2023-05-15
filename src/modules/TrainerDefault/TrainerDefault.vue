<template>
    <div class="trainer block">
        <ProgressBarCounter class="trainer__progress" current="5" total="24"/>
        <div class="trainer__middle">
            <div class="trainer__word">fever</div>
            <div class="trainer__translation">лихорадка</div>
            <div class="trainer__task">Верный ли это перевод?</div>
            <div class="trainer__controls">
                <VButton class="trainer__button" text="Не верно" variant="error" />
                <VButton class="trainer__button" text="Верно" variant="success"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import ProgressBarCounter from "@components/ProgressBarCounter.vue";
    import VButton from '@components/VButton.vue';


</script>

<style lang="scss" scoped>
    .trainer {
        padding: 20px;

        &__middle {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;

            font-size: 32px;
        }

        &__translation {
            filter: opacity(0.6);
        }

        &__task {
            margin-top: 20px;
            color: var(--c-secondary);
            font-size: 16px;
        }

        &__controls {
            align-self: stretch;

            display: flex;
            justify-content: center;
            gap: 24px;
            margin-top: 20px;
        }

        &__button {
            width: 400px;
            font-size: 20px;
        }
    }
</style>