<script setup lang="ts">
import { NSkeleton } from 'naive-ui'
withDefaults(
    defineProps<{
        image?: boolean
        self: boolean
    }>(),
    {
        image: false,
    }
)
</script>

<template>
    <div
        class="flex w-full"
        :style="{ justifyContent: self ? 'flex-end' : 'flex-start' }"
    >
        <div
            v-if="image"
            class="message-image-wrapper my-0.5"
            :style="{
                width: randomWidthPercent(30, 60),
            }"
        >
            <NSkeleton
                sharp
                width="100%"
                :height="randomNumber(72, 192) + 'px'"
                class="rounded-lg"
            />
        </div>
        <div
            v-else
            class="my-0.5"
            :style="{
                width: randomWidthPercent(20, 40),
            }"
        >
            <NSkeleton class="rounded-lg" width="100%" height="38.4px" />
        </div>
    </div>
</template>

<style lang="less" scoped></style>
