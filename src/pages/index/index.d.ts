export type Res<T> = { status: Boolean, data: T }
export interface IBreadcrumbItem {
    displayName: string,
    to?: string | { name: string, params?: any, replace?: boolean }
}
export interface IReview {
    img?: string,
    name: string,
    review: string
}
export interface IWordTranslation {
    translation: string,
    frequency: number
}
export interface IWord {
    word: string,
    transcription: string,
    img: string,
    translations: IWordTranslation[],
}
export interface IWordSimple {
    word: string,
    transcription: string,
    img: string,
    translation: string,
}
export interface IDoughnutItem {
    name: string,
    value: number
}
export interface IWordSet {
    id: string,
    imgPath: string
    title: string
    description: string,
    words?: IWordSimple[]
}