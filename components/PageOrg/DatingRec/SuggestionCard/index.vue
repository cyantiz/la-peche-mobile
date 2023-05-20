<script setup lang="ts">
import { NButton } from 'naive-ui'
import { PhMagnifyingGlassPlus } from 'phosphor-vue'

defineEmits(['showDetailBtnClick'])

const props = defineProps<{
    images: IImage[]
    info: IUserInformation
}>()

const age = computed(() => {
    return useNow().value.getFullYear() - (props.info.yearOfBirth ?? 0)
})
</script>

<template>
    <ClientOnly>
        <div
            class="__info custom-shadow mx-auto flex w-full max-w-[720px] cursor-pointer flex-col rounded-xl bg-white p-4"
        >
            <div class="__info__images flex w-full gap-4">
                <PageOrgDatingRecImageCarousel
                    :images="images"
                    :slides-per-view="2"
                />
            </div>

            <div class="__info__text flex flex-col gap-4 p-4 pb-2">
                <div class="__info_text_basic flex w-full justify-between">
                    <div class="flex flex-col">
                        <span class="cursor-text text-3xl font-bold"
                            >{{ info.name }}, {{ age }}</span
                        >
                        <span
                            class="flex cursor-text items-center gap-2.5 text-lg font-medium text-inactive"
                        >
                            <PhMapPin weight="fill" size="20" />
                            {{ info.location }}
                        </span>
                        <span
                            class="flex cursor-text items-center gap-2.5 text-lg font-medium text-inactive"
                        >
                            <PhGraduationCap weight="fill" size="20" />
                            {{ info.education }}
                        </span>
                    </div>
                    <div class="actions flex items-start gap-8">
                        <PageOrgDatingRecActionButton type="star" />
                        <div class="flex gap-6">
                            <PageOrgDatingRecActionButton type="dislike" />
                            <PageOrgDatingRecActionButton type="like" />
                        </div>
                    </div>
                </div>
                <div class="__info__text_else w-full">
                    <div class="cursor-text text-base">
                        {{ info.biographic }}
                    </div>
                </div>
                <NButton
                    block
                    @click="$emit('showDetailBtnClick', images, info)"
                >
                    <template #icon>
                        <PhMagnifyingGlassPlus weight="fill" />
                    </template>
                    Detail information
                </NButton>
            </div>
        </div>
    </ClientOnly>
</template>

<style lang="less" scoped>
.custom-shadow {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
}
</style>
