<script setup lang="ts">
import { NAlert } from 'naive-ui'
import BaseProfileSection from '../base/BaseProfileSection.vue'
import Image from './Image.vue'
useHead({
    title: 'My Profile',
})

const images = ref<string[]>([
    'https://img.washingtonpost.com/rf/image_480w/2010-2019/WashingtonPost/2014/03/25/Style/Images/10000041H6676246.jpg?uuid=T6rUJLO1EeOMtihAUlVNdA',
    '',
    '',
    '',
    '',
    '',
])
console.log(images.value)
</script>

<template>
    <BaseProfileSection block title="Images" :have-edit-modal="false">
        <template #content>
            <div class="p-1">
                <NAlert title="Hey! Show-off more" type="info">
                    You can upload upto 6 images, sort them by dragging and
                    dropping
                </NAlert>
            </div>
            <div class="flex flex-wrap">
                <Image
                    v-for="(image, index) in images"
                    :key="index"
                    :src="image"
                />
            </div>
        </template>
        <template #modal-content> Edit form for biographic </template>
    </BaseProfileSection>
</template>

<style lang="less" scoped></style>
