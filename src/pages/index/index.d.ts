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
export interface IWordShallow {
    word: string,
    transcription: string,
    img: string,
    translation: string,
}
export interface IWordFull {
    word: string,
    transcription: string,
    img: string,
    translations: IWordTranslation[],
}


// Типы для донат-чарта
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


// Типы тренировок для страницы PageTrain
import TrainerRightWrong from '@modules/TrainerRightWrong/TrainerRightWrong.vue';
import TrainerWithOptions from '@modules/TrainerWithOptions/TrainerWithOptions.vue';
type Trainer = typeof TrainerRightWrong | typeof TrainerWithOptions;
interface ITrainMapItem {
    component: Trainer,
    displayName: string,
}
interface ITrainMap {
    'train': ITrainMapItem,
    'train-en-ru': ITrainMapItem,
    'train-ru-en': ITrainMapItem
}
export type TrainingType = keyof ITrainMap


// Типы для данных для тренажеров
/**
 * Пропс для тренажера Верно не верно
 */
export type IRightWrongWord = {
    word: string,
    visibleTranslation: string,
    actualTranslation: string
}
/**
 * Пропс для тренажера с опциями
 */
export interface IEnRuOrRuEnWord {
    test: string
}
export type TrainerData = IRightWrongWord[] | IEnRuOrRuEnWord[];




// Типы для ответов с бэкенда
export type WordSetJson = IWordSet;
export type WordSetsJson = IWordSet[];
export type ReviewsJson = IReview[];
export type WordOfDayJson = IWordFull;

export type TrainerJson = {
    wordSet: IWordSet,
    trainerData: TrainerData
}
// export type EnRuJson = any;
// export type RuEnJson = any;
// export type TrainerJson = RightWrongJson | EnRuJson | RuEnJson;