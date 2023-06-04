import { defineStore } from "pinia";
import { ref } from "vue";

import type { IBreadcrumbItem } from "@types";

export const useBreadcrumbsStore = defineStore('breadcrumbs', () => {
    const breadcrumbs = ref<IBreadcrumbItem[]>([]);

    return { breadcrumbs }
})