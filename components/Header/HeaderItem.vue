<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        size: 'tiny' | 'small' | 'medium'
        shape: 'circle' | 'rounded-square'
    }>(),
    {
        size: 'medium',
        shape: 'circle',
    }
)

const classes = computed(() => {
    let size = ''
    let shape = ''
    switch (props.size) {
        case 'tiny':
            size = 'p-[5px]'
            break
        case 'small':
            size = 'p-[10px]'
            break
        case 'medium':
            size = 'p-3'
            break
    }

    switch (props.shape) {
        case 'circle':
            shape = 'rounded-full'
            break
        case 'rounded-square':
            switch (props.size) {
                case 'tiny':
                    shape = 'rounded'
                    break
                case 'small':
                    shape = 'rounded-md'
                    break
                case 'medium':
                    shape = 'rounded-xl'
                    break
            }
            break
    }

    return `cursor-pointer bg-white hover:bg-yellow-green-crayola hover:bg-opacity-10 neu-border-2 neu-shadow-lb-2 hover:neu-shadow-0 hover:-translate-x-[1px] hover:translate-y-[1px] transition-all duration-200 flex items-center justify-center ${size} ${shape}`
})

const iconSize = computed(() => {
    switch (props.size) {
        case 'tiny':
            return 16
        case 'small':
            return 20
        case 'medium':
            return 28
    }
})
</script>

<template>
    <div :class="classes">
        <slot name="icon" :size="iconSize" color="black" />
    </div>
</template>

<style lang="less" scoped></style>
