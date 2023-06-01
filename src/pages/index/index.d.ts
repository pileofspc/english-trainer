export type { PropType } from "vue"
export interface IBreadcrumbItem {
    displayName: string,
    to?: string | { name: string, params?: any }
}