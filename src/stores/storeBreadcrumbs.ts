import { defineStore } from "pinia";
import { ref } from "vue";

import type { IBreadcrumb } from "@types";

export const useBreadcrumbsStore = defineStore("breadcrumbs", () => {
    const breadcrumbs = ref<IBreadcrumb[]>([]);

    return { breadcrumbs };
});
