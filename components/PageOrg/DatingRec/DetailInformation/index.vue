<script setup lang="ts">
import { NModal, NCard } from 'naive-ui'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

defineProps<{
    images: IImage[]
    info: IUserInformation
    show: boolean
}>()

defineEmits(['close'])

const pending = ref(true)

const breakPoints = useBreakpoints(breakpointsTailwind)
const lg = breakPoints.smallerOrEqual('lg')
const sm = breakPoints.smallerOrEqual('sm')

onMounted(async () => {
    await useDelay(1000)
    pending.value = false
})
</script>

<template>
    <NModal
        :show="show"
        transform-origin="center"
        :mask-closable="false"
        @close="$emit('close')"
    >
        <NCard
            class="h-screen lg:h-auto"
            header-style="padding: 16px 16px 16px 16px"
            style="margin-inline: auto; width: auto"
            :bordered="false"
            content-style="display: flex; height: full; overflow:scroll; position: relative"
            :size="lg ? 'small' : 'large'"
            role="dialog"
            aria-modal="true"
            :closable="true"
            @close="$emit('close')"
        >
            <div class="flex h-full flex-col gap-8 overflow-scroll lg:flex-row">
                <PageOrgDatingRecDetailImageSkeleton v-show="pending" />
                <PageOrgDatingRecDetailImage
                    v-show="!pending"
                    :images="images"
                    :slides-per-view="sm ? 1 : lg ? 2 : 1"
                />

                <ClientOnly>
                    <PageOrgDatingRecDetailTextSkeleton v-show="pending" />
                    <PageOrgDatingRecDetailTextAndAction
                        v-show="!pending"
                        :info="info"
                    />
                </ClientOnly>
            </div>
        </NCard>
    </NModal>
</template>

<style lang="less" scoped></style>
