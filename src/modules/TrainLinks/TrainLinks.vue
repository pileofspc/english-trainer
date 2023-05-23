<template>
    <div class="train-links block">
        <div class="block-title">Тренировки по данному набору</div>
        <div class="train-links__links">
            <router-link :to="{ name: 'PageTrain', params: {trainingType: 'train'} }">
                <TrainLink
                    class="hollow-card"
                    title="Верно не верно"
                    description="Угадайте, верный ли перевод предлагает verbify"
                    :bg="trainDefault"
                />
            </router-link>
            <router-link :to="{name: 'PageTrain', params: {trainingType: 'train-eng-rus'}}">
                <TrainLink
                    class="hollow-card"
                    title="С английского на русский"
                    description="Выбираем правильный перевод"
                    :bg="trainEngRus"
                />
            </router-link>
            <router-link :to="{name: 'PageTrain', params: {trainingType: 'train-rus-eng'}}">
                <TrainLink
                    class="hollow-card"
                    title="С русского на английский"
                    description="Выбираем правильный перевод"
                    :bg="trainRusEng"
                />
            </router-link>
        </div>
    </div>
</template>

<script setup>
    import TrainLink from "@modules/TrainLink/TrainLink.vue";
    import trainDefault from "@images/trainers/train.png";
    import trainEngRus from "@images/trainers/train-eng-rus.png";
    import trainRusEng from "@images/trainers/train-rus-eng.png";

    console.log(trainDefault)
</script>

<style lang="scss" scoped>
    .train-links {
        padding: 20px;

        &__links {
            display: grid;
            gap: 18px;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            margin-top: 20px;
        }

        &__link {
            width: auto;
        }
    }
</style>