import { defineStore } from "pinia";
import { ref } from "vue";

import { useGeneralStore } from "@stores/storeGeneral";

import type { IBreadcrumb } from "@types";

export const useBreadcrumbsStore = defineStore("breadcrumbs", () => {
    const genStore = useGeneralStore();

    const breadcrumbs = ref<IBreadcrumb[]>([]);
    const pageWordSetDisplayName = ref("");

    function setBreadcrumbs(value: IBreadcrumb[]) {
        breadcrumbs.value = value;
    }

    function getDisplayName() {
        genStore;
    }

    return { breadcrumbs, pageWordSetDisplayName, setBreadcrumbs };
});
