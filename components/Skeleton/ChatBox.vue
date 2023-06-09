<script setup lang="ts">
import { NSkeleton } from 'naive-ui'
</script>

<template>
    <div class="flex h-full w-full flex-col justify-between gap-2">
        <div class="flex items-center gap-2">
            <NSkeleton circle :width="48" :height="48" />
            <NSkeleton sharp :width="120" :height="24" />
        </div>
        <div class="h-full w-full overflow-y-auto">
            <SkeletonChatBoxMessage :self="true" />
            <SkeletonChatBoxMessage :self="true" />
            <SkeletonChatBoxMessage :self="true" :image="true" />
            <SkeletonChatBoxMessage :self="false" />
            <SkeletonChatBoxMessage :self="true" />
            <SkeletonChatBoxMessage :self="false" />
            <SkeletonChatBoxMessage :self="false" :image="true" />
            <SkeletonChatBoxMessage :self="false" />
            <SkeletonChatBoxMessage :self="true" />
            <SkeletonChatBoxMessage :self="true" />
            <SkeletonChatBoxMessage :self="false" />
            <SkeletonChatBoxMessage :self="true" />
            <SkeletonChatBoxMessage :self="false" />
            <SkeletonChatBoxMessage :self="false" />
        </div>
        <SkeletonChatMessageInput />
    </div>
</template>

<style lang="less" scoped></style>
