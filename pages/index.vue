<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useCounterStore } from '~/store/counter'

const counter = useCounterStore()

const increment = () => counter.increment()
</script>

<template>
    <div class="mx-auto flex flex-col items-center">
        <div class="text-3xl p-4 text-center">
            Nuxt 3 + NaiveUI + Tailwind + Pinia
        </div>

        <n-button @click="increment">
            Count: {{ counter.$state.count }}
        </n-button>

        <draggable-box />

        <div>
            <div class="pb-4 text-xs">Lorem ipsum dolor sit, amet</div>
            <div class="pb-4 text-sm">Lorem ipsum dolor sit amet</div>
            <div class="pb-4 text-base">Lorem ipsum dolor sit amet</div>
            <div class="pb-4 text-lg">Lorem ipsum dolor sit amet</div>
            <div class="pb-4 text-xl">Lorem ipsum dolor sit amet</div>
            <div class="pb-4 text-2xl">Lorem ipsum dolor sit amet</div>
            <div class="pb-4 text-3xl">Lorem ipsum dolor sit amet</div>
            <div class="pb-4 text-4xl">Lorem ipsum dolor sit amet</div>
            <div class="pb-4 text-5xl">Lorem ipsum dolor sit amet</div>
            <div class="pb-4 text-6xl">Lorem ipsum dolor sit amet</div>
            <div class="pb-4 text-7xl">Lorem ipsum dolor sit amet</div>
            <div class="pb-4 text-8xl">Lorem ipsum dolor sit amet</div>
        </div>
    </div>
</template>

<style lang="less" scoped></style>
