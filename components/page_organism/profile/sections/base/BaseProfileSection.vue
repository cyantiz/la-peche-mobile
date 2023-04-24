<script setup lang="ts">
import { PhPencilSimple } from 'phosphor-vue'
import BaseModal from './BaseModal.vue'
defineProps<{
    title: string
    informationRecords: {
        title: string
        content: string | number | null
        iconComponent: any // add `any` here because of framework complex type
    }[]
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
                class="profile__section__header__edit-btn cursor-pointer text-bitter-sweet hover:scale-105"
                @click="() => openModal()"
            />
        </div>
        <div
            class="profile__section__items inline-flex flex-col items-center border-[0.5px] border-solid border-inactive"
        >
            <InformationItem
                v-for="information in informationRecords"
                :key="information.title"
                :title="information.title"
                :content="information.content"
                @add-button-click="openModal"
            >
                <template #icon="{ size }">
                    <component
                        :is="information.iconComponent"
                        :size="size"
                        weight="bold"
                    />
                </template>
            </InformationItem>
        </div>
        <BaseModal
            :title="title"
            :show="isModalOpen"
            @close="closeModal"
            @negative-click="closeModal"
        >
            <slot name="modal-content" />
        </BaseModal>
    </div>
</template>

<style lang="less" scoped></style>
