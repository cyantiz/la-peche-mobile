<script setup lang="ts">
defineProps<{
    icon: any
    text: string | number | null
}>()
</script>

<template>
    <div
        class="hover:border-theme hover:text-theme inline-flex select-none items-center gap-2 rounded-full border border-solid border-inactive px-2 py-1 text-base transition-all duration-200"
    >
        <component :is="icon" :size="20" />
        {{ text }}
    </div>
</template>

<style lang="less" scoped></style>
