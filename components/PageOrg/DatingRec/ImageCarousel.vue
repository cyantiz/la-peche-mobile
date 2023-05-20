<script setup lang="ts">
import { NCarousel, NCarouselItem, NIcon, NImage, NSpin } from 'naive-ui'
import { PhArrowLeft, PhArrowRight } from 'phosphor-vue'

withDefaults(
    defineProps<{
        images: Array<IImage>
        slidesPerView: number
    }>(),
    {
        slidesPerView: 1,
    }
)
</script>

<template>
    <NCarousel
        show-arrow
        :slides-per-view="slidesPerView"
        class="rounded-lg"
        :loop="true"
    >
        <NCarouselItem
            v-for="image in images"
            :key="image.id"
            class="aspect-[3/4]"
        >
            <div class="profile-carousel-img flex aspect-[3/4]">
                <div class="flex h-full w-full items-stretch justify-stretch">
                    <NImage :src="image.url" object-fit="cover" lazy>
                        <template #placeholder>
                            <div
                                class="flex h-full w-full items-center justify-center bg-slate-200"
                            >
                                <NSpin />
                            </div>
                        </template>
                    </NImage>
                </div>
            </div>
        </NCarouselItem>
        <template #arrow="{ prev, next }">
            <div class="custom-arrow">
                <button type="button" class="custom-arrow--left" @click="prev">
                    <NIcon><PhArrowLeft /></NIcon>
                </button>
                <button type="button" class="custom-arrow--right" @click="next">
                    <NIcon><PhArrowRight /></NIcon>
                </button>
            </div>
        </template>
        <template #dots="{ total, currentIndex, to }">
            <ul class="custom-dots">
                <li
                    v-for="index of total"
                    :key="index"
                    :class="{ ['is-active']: currentIndex === index - 1 }"
                    @click="to(index - 1)"
                />
            </ul>
        </template>
    </NCarousel>
</template>

<style lang="less" scoped>
.custom-arrow {
    display: flex;
    position: absolute;
    top: 20px;
    right: 10px;
}

.custom-arrow button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-right: 12px;
    color: #000;
    background-color: rgba(255, 255, 255, 0.8);
    border-width: 0;
    border-radius: 8px;
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.custom-arrow button:hover {
    background-color: rgba(255, 255, 255, 1);
}

.custom-arrow button:active {
    transform: scale(0.95);
    transform-origin: center;
}

.custom-dots {
    display: flex;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 20px;
    left: 20px;
}

.custom-dots li {
    display: inline-block;
    width: 12px;
    height: 4px;
    margin: 0 3px;
    border-radius: 4px;
    background-color: rgba(2555, 2555, 255, 0.4);
    box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.4);
    transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.custom-dots li.is-active {
    width: 40px;
    background: white;
}
</style>

<style lang="less">
.profile-carousel-img .n-image img,
.profile-carousel-img .n-image {
    width: 100%;
    height: 100%;
}
</style>
