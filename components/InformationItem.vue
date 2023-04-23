<script setup lang="ts">
withDefaults(
    defineProps<{
        title: string
        content?: number | string | null | undefined
        block?: boolean
    }>(),
    {
        block: false,
        content: '',
    }
)
defineEmits(['addButtonClick'])
</script>

<template>
    <div
        class="inline-flex items-center border-[0.5px] border-solid border-inactive px-3 py-[6px]"
        :class="{ 'w-full ': block }"
    >
        <div
            class="inline-flex w-[170px] items-center gap-2"
            :class="{ 'w-full': block }"
        >
            <slot name="icon" :size="18" color="black" />
            <span class="font-bold">{{ title }}</span>
        </div>
        <span v-if="content" class="text-md w-[180px] text-right font-medium">{{
            content
        }}</span>
        <span
            v-else
            class="text-md text-md w-[180px] cursor-pointer text-right font-bold text-inactive"
            @click="$emit('addButtonClick')"
            >Add</span
        >
    </div>
</template>

<style lang="less" scoped></style>
