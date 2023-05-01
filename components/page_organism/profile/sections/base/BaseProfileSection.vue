<script setup lang="ts">
import { PhPencilSimple } from 'phosphor-vue'
import BaseModalDialog from './BaseModalDialog.vue'
defineProps<{
    title: string
}>()
const isModalOpen = ref(false)

const openModal = () => {
    isModalOpen.value = true
}
const closeModal = () => {
    isModalOpen.value = false
}
</script>

<template>
    <div class="profile__section flex flex-col items-center justify-center">
        <div class="profile__section__header flex items-center gap-2">
            <div class="dot h-2 w-2 rounded-full bg-bitter-sweet"></div>
            <span class="text-2xl font-bold">
                {{ title }}
            </span>
            <PhPencilSimple
                :size="24"
                weight="fill"
                class="cursor-pointer text-bitter-sweet hover:scale-105"
                @click="() => openModal()"
            />
        </div>
        <div
            class="profile__section__content inline-flex flex-col items-center border-[0.5px] border-solid border-inactive"
        >
            <slot name="profile-content" />
        </div>
        <BaseModalDialog
            :title="title"
            :show="isModalOpen"
            @close="closeModal"
            @negative-click="closeModal"
        >
            <slot name="modal-content" />
        </BaseModalDialog>
    </div>
</template>

<style lang="less" scoped></style>
