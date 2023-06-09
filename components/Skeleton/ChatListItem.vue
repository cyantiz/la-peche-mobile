<script setup lang="ts">
import { NSkeleton } from 'naive-ui'
</script>

<template>
    <div>
        <div
            class="flex w-full items-center gap-0 rounded bg-white p-2 transition-all duration-200 lg:gap-2"
        >
            <NSkeleton circle :width="48" :height="48" />
            <div
                class="overflow:hidden flex h-0 w-0 flex-1 opacity-0 transition-all duration-200 lg:h-auto lg:w-auto lg:opacity-100"
            >
                <div class="flex flex-1 flex-col gap-1 pb-1">
                    <NSkeleton :width="120" :height="24" />
                    <NSkeleton :width="60" :height="16" />
                </div>
                <NSkeleton :width="60" :height="19" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped></style>
