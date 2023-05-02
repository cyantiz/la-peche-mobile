<script setup lang="ts">
import { PhBellSimple, PhDotsNine, PhChatCenteredDots } from 'phosphor-vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import Navbar from './Navbar/index.vue'

const breakPoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakPoints.smallerOrEqual('md')
</script>

<template>
    <header class="flex w-full flex-col px-4 pt-2">
        <div
            class="neu-border-2 neu-shadow-lb-4 flex w-full flex-col gap-1 rounded-xl bg-yellow-green-crayola bg-opacity-10 px-4 py-2 md:px-8"
        >
            <div class="flex h-full w-full justify-between">
                <Logo size="sm" is-with-text />
                <div v-if="!isMobile" class="header-right--desktop flex gap-9">
                    <div class="flex gap-4">
                        <HeaderItem size="small" shape="rounded-square">
                            <template #icon="{ size, color }">
                                <PhBellSimple
                                    :size="size"
                                    :color="color"
                                    weight="bold"
                                />
                            </template>
                        </HeaderItem>
                        <HeaderItem size="small" shape="rounded-square">
                            <template #icon="{ size, color }">
                                <PhDotsNine
                                    :size="size"
                                    :color="color"
                                    weight="bold"
                                />
                            </template>
                        </HeaderItem>
                    </div>
                    <div class="divider my-2 w-[2px] rounded-xl bg-black"></div>
                    <div
                        class="neu-border-2 neu-shadow-lb-2 hover:neu-shadow-0 flex overflow-hidden rounded-xl transition-all duration-200 hover:-translate-x-[1px] hover:translate-y-[1px]"
                    >
                        <Avatar
                            src="https://i1-giaitri.vnecdn.net/2013/04/06/cobain00-jpg-1365215535.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=N1btuexChzpWLU0036GHsg"
                            :size="40"
                        />
                    </div>
                </div>
                <div v-if="isMobile" class="header-right--mobile">
                    <HeaderItem
                        size="tiny"
                        shape="rounded-square"
                        @click="$router.push({ name: 'Messages' })"
                    >
                        <template #icon="{ size, color }">
                            <PhChatCenteredDots
                                :size="size"
                                :color="color"
                                weight="bold"
                            />
                        </template>
                    </HeaderItem>
                </div>
            </div>
            <Navbar v-if="isMobile" />
        </div>
    </header>
</template>

<style lang="less" scoped>
header {
    z-index: 100;
}
</style>
