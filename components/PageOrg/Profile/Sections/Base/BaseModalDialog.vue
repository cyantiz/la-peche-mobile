<script setup lang="ts">
import { NModal } from 'naive-ui'
defineProps<{
    title: string
    show: boolean
}>()

defineEmits(['close', 'negativeClick', 'positiveClick'])
</script>

<template>
    <NModal
        :show="show"
        :show-icon="false"
        preset="dialog"
        positive-text="Save"
        negative-text="Cancel"
        :negative-button-props="{ size: 'medium' }"
        :positive-button-props="{ size: 'medium' }"
        @positive-click="$emit('positiveClick')"
        @negative-click="$emit('negativeClick')"
        @mask-click="$emit('close')"
        @esc="() => $emit('close')"
        @close="() => $emit('close')"
    >
        <template #header>{{ title }} </template>
        <slot />
    </NModal>
</template>

<style lang="less" scoped></style>
