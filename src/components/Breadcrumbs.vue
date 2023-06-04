<template>
    <div class="breadcrumbs block">
        <template v-for="item in props.items">
            <router-link class="breadcrumbs__item" v-if="item.to" :to="item.to">{{ item.displayName }}</router-link>
            <div class="breadcrumbs__item" v-if="!item.to">{{ item.displayName }}</div>
        </template>
    </div>
</template>

<script setup lang="ts">
    import type { PropType} from "vue";
    import type { IBreadcrumbItem} from "@types";
    
    const props = defineProps({
        items: {
            type: Array as PropType<IBreadcrumbItem[]>,
            required: true,
        }
    })
</script>

<style lang="scss" scoped>
    .breadcrumbs {
        display: flex;
        padding: 20px;
    }
</style>