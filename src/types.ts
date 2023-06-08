export type Res<T> = { status: Boolean; data: T };

export type VButton = "accent" | "bright" | "error" | "success";

export interface IBreadcrumb {
    displayName: string;
    to?: string | { name: string; params?: any; replace?: boolean };
}

export interface IReview {
    img?: string;
    name: string;
    review: string;
}

export interface IWordShallow {
    word: string;
    transcription: string;
    img: string;
    translation: string;
}
export interface IWordFull {
    word: string;
    transcription: string;
    img: string;
    translations: IWordTranslation[];
}
export interface IWordTranslation {
    translation: string;
    frequency: number;
}

export interface IWordSet {
    id: string;
    imgPath: string;
    title: string;
    description: string;
    words?: IWordShallow[];
}

export interface IDoughnutItem {
    name: string;
    value: number;
}

// Типы для данных для тренажеров
export interface ITrainMap {
    train: ITrainMapItem;
    "train-en-ru": ITrainMapItem;
    "train-ru-en": ITrainMapItem;
}
export interface ITrainMapItem {
    component: any;
    displayName: string;
}
// type Trainer = typeof TrainerRightWrong | typeof TrainerWithOptions;
export type TrainingType = keyof ITrainMap;

export type IRightWrongWord = {
    word: string;
    visibleTranslation: string;
    actualTranslation: string;
};
export type OptionStatus = "chosen-correct" | "chosen-incorrect" | "correct";
export interface ITrainerOption {
    word: string;
    isCorrect: boolean;
    status?: OptionStatus;
}
export interface IWithOptionsWord {
    word: string;
    img: string;
    transcription?: string;
    options: ITrainerOption[];
}

// Типы для ответов с бэкенда
export type WordSetJson = Res<IWordSet>;
export type WordSetsJson = Res<IWordSet[]>;
export type ReviewsJson = Res<IReview[]>;
export type WordOfDayJson = Res<IWordFull>;
export type TrainJson = Res<{
    wordSet: IWordSet;
    trainerData: IRightWrongWord[];
}>;
export type TrainWithOptionJson = Res<{
    wordSet: IWordSet;
    trainerData: IWithOptionsWord[];
}>;
