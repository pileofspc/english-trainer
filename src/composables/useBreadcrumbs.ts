import type { IBreadcrumb } from "@types";
import { computed, watch } from "vue";
import { useBreadcrumbsStore } from "@stores/storeBreadcrumbs";

export default function useBreadcrumbs(breadcrumbs: IBreadcrumb[]) {
    const breadcrumbsComputed = computed(() => {
        return breadcrumbs;
    });

    const bcstore = useBreadcrumbsStore();
    // вотчер вместо присваивания компьютед свойства нужен, чтобы избежать ошибки типов
    bcstore.setBreadcrumbs(breadcrumbsComputed.value);
    watch(breadcrumbsComputed, () => {
        bcstore.breadcrumbs = breadcrumbsComputed.value;
    });

    return breadcrumbsComputed;
}
