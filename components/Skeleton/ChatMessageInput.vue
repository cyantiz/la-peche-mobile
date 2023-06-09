<script setup lang="ts">
import { NSkeleton } from 'naive-ui'
</script>

<template>
    <div class="mt-10 flex gap-2 text-xs transition-all md:text-sm">
        <NSkeleton width="100%" :height="40" sharp round />
        <NSkeleton :width="40" :height="40" circle />
    </div>
</template>

<style lang="less" scoped></style>
