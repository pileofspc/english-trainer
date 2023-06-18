<template>
    <slot
        name="fetching"
        v-if="
            props.status === FetchStatuses.Fetching ||
            props.status === FetchStatuses.NotStarted
        "
    >
        <VLoader />
    </slot>
    <slot v-if="props.status === FetchStatuses.Ready"></slot>
    <slot name="empty" v-if="props.status === FetchStatuses.Empty">
        <div>Нет данных для отображения</div>
    </slot>
    <slot name="error" v-if="props.status === FetchStatuses.Error">
        <div>Произошла ошибка при запросе</div>
    </slot>
</template>

<script setup lang="ts">
    import VLoader from "@components/VLoader.vue";
    import type { PropType } from "vue";
    import { FetchStatuses } from "/src/FetchStatuses";
    import { useRouter } from "vue-router";
    import { watch } from "vue";

    const router = useRouter();

    const props = defineProps({
        status: {
            type: String as PropType<FetchStatuses>,
            required: true,
        },
        redirect: {
            type: Boolean,
        },
    });

    watch(
        () => props.status,
        (value) => {
            if (props.redirect && props.status === FetchStatuses.Error) {
                router.replace("/error404");
            }
        }
    );
</script>

<style lang="scss" scoped></style>
