<template>
    <div class="review">
        <div class="review__img-container">
            <img class="review__img" :src="imageUrl" alt="Фото автора отзыва">
        </div>
        <div class="review__author small-block-title">{{ props.author }}</div>
        <div class="review__text">{{ props.text }}</div>
    </div>
</template>

<script setup>
    import DefaultImage from '@images/Artwork.svg';
    import {onMounted, ref} from "vue";

    const props = defineProps({
        imgPath: String,
        author: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    });

    const imageUrl = ref(null);
    fetchImage();

    function fetchImage() {
        fetch(props.imgPath)
            .then(res => res.blob())
            .then(blob => imageUrl.value = URL.createObjectURL(blob))
    }

</script>

<style lang="scss" scoped>
    .review {
        text-align: center;

        &__img-container {
            width: 120px;
            height: 120px;
            margin: 0 auto;
            overflow: hidden;
            border-radius: 50%;
        }

        &__img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        &__author {
            margin-top: 12px;
        }

        &__text {
            font-size: 14px;
            margin-top: 4px;
        }
    }
</style>