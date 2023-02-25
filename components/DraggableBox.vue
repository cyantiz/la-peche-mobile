<script setup lang="ts">
const el = ref<HTMLElement | null>(null)

const { x, y, style, isDragging } = useDraggable(el, {
    initialValue: { x: 300, y: 300 },
})
</script>

<template>
    <div
        ref="el"
        :style="style"
        class="fixed flex w-96 cursor-move select-none flex-col items-center rounded-md border-2 border-black bg-white p-3"
    >
        <div>👋 Drag me!</div>
        <div>I am at {{ x }}, {{ y }}</div>
        <div>{{ isDragging ? 'Dragging' : 'Not dragging' }}</div>
    </div>
</template>

<style lang="less" scoped></style>
