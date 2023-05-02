<script setup lang="ts">
import { PhPencilSimple } from 'phosphor-vue'
import BaseModalDialog from './BaseModalDialog.vue'

withDefaults(
    defineProps<{
        title: string
        block?: boolean
    }>(),
    {
        block: false,
    }
)
const isModalOpen = ref(false)

const openModal = () => {
    isModalOpen.value = true
}
const closeModal = () => {
    isModalOpen.value = false
}
</script>

<template>
    <div
        class="'profile__section neu-border-3 neu-shadow-rt-3 inline-flex flex-col items-center rounded-xl bg-yellow-green-crayola bg-opacity-5 p-3"
        :class="{ 'w-full': block }"
    >
        <div
            class="profile__section__header mb-4 flex w-full items-center justify-between pl-3"
        >
            <span class="text-xl font-bold">
                {{ title }}
            </span>
            <PhPencilSimple
                :size="24"
                weight="fill"
                class="cursor-pointer text-bitter-sweet transition-all hover:scale-110"
                @click="() => openModal()"
            />
        </div>

        <div class="profile__section__content">
            <slot name="content" />
        </div>
    </div>
    <BaseModalDialog
        :title="title"
        :show="isModalOpen"
        @close="closeModal"
        @negative-click="closeModal"
    >
        <slot name="modal-content" />
    </BaseModalDialog>
</template>

<style lang="less" scoped></style>
