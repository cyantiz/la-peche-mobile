<script setup lang="ts">
import { NSkeleton } from 'naive-ui'
</script>

<template>
    <div
        class="mt-10 flex gap-2 pb-4 text-xs transition-all md:pb-0 md:text-sm"
    >
        <NSkeleton width="100%" :height="40" sharp class="rounded-lg" />
        <NSkeleton :width="40" :height="40" sharp class="rounded-lg" />
    </div>
</template>

<style lang="less" scoped></style>
