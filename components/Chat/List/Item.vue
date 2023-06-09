<script setup lang="ts">
interface Props {
    active: boolean
    userInfo: IChatUserInfo
    date: {
        seconds: number
        nanoseconds: number
    }
}
defineProps<Props>()
defineEmits(['select'])
</script>

<template>
    <div>
        <div
            class="flex w-16 cursor-pointer items-center gap-0 rounded p-2 transition-all duration-200 lg:w-72 lg:gap-2"
            :class="
                active
                    ? 'bg-theme-dim-2'
                    : 'bg-white hover:bg-black hover:bg-opacity-5'
            "
            @click="$emit('select')"
        >
            <Avatar :src="userInfo.avatar" :size="48" />
            <div
                class="overflow:hidden flex h-0 w-0 flex-1 opacity-0 transition-all duration-200 lg:h-auto lg:w-auto lg:opacity-100"
            >
                <div class="flex-1 pb-1">
                    <p
                        class="overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold"
                    >
                        {{ userInfo.name }}
                    </p>
                    <p class="text-xs">@{{ userInfo.username }}</p>
                </div>
                <div class="time-stamp text-xs font-light">
                    {{ getDateFormalString(new Date(date.seconds * 1000)) }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped></style>
