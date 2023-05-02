<script setup lang="ts">
import { NDivider } from 'naive-ui'

withDefaults(
    defineProps<{
        title: string
        content?: number | string | null | undefined
        block?: boolean
        bottomDivider: boolean
    }>(),
    {
        block: false,
        content: '',
        bottomDivider: true,
    }
)
defineEmits(['addButtonClick'])
</script>

<template>
    <div
        class="inline-flex w-[496px] items-center justify-between px-3 py-[6px]"
        :class="{ 'w-full ': block }"
    >
        <div
            class="inline-flex items-center gap-2"
            :class="{ 'w-full': block }"
        >
            <slot name="icon" :size="18" color="black" />
            <span class="font-bold">{{ title }}</span>
        </div>
        <div v-if="content" class="text-md text-right font-medium">
            {{ content }}
        </div>
        <div
            v-else
            class="text-md text-md w-[240px] text-right font-bold text-inactive"
        >
            <span class="cursor-pointer" @click="$emit('addButtonClick')">
                Add
            </span>
        </div>
    </div>
    <NDivider v-show="bottomDivider" />
</template>

<style lang="less" scoped>
.n-divider {
    margin-block: 0.05rem !important;
}
</style>
