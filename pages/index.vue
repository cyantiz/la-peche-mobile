<script setup lang="ts">
import _ from 'lodash'
import { useLoadingBar, NSpin } from 'naive-ui'
import { useAuthStore } from '~/store/auth'
import { useRecommendationStore } from '~/store/recommendation'
useHead({
    title: 'Explore',
})
definePageMeta({
    layout: 'default',
})

const auth = useAuthStore()
const loadingBar = useLoadingBar()

onMounted(() => {
    if (!process.client) return
    setTimeout(() => loadingBar.finish(), 1)
})
type IUserInformationWithImagesWithIndex = IUserInformationWithImages & {
    _index: number
}

const cardGreatesIndex = ref(200)

const recommendationStore = useRecommendationStore()

const recommendationList = ref<IUserInformationWithImagesWithIndex[]>([])
const pending = ref(true)
const detailImages = ref<IImage[] | null>(null)
const detailInfo = ref<IUserInformation | null>(null)
const showDetail = ref(false)

const openDetail = (_infoWithImages: IUserInformationWithImages) => {
    detailImages.value = _infoWithImages.images
    detailInfo.value = _infoWithImages
    showDetail.value = true
}
onMounted(async () => {
    pending.value = true
    const newRecommendation = await recommendationStore.getRecommendations(7)
    const newRecommendationWithIndex = newRecommendation.map((item) => ({
        ...item,
        _index: cardGreatesIndex.value++,
    }))
    recommendationList.value.push(...newRecommendationWithIndex)
    pending.value = false
})

const dismiss = async (_id: number | undefined) => {
    if (!_id) return

    // find and remove item have id === input _id in recommendationList
    await useDelay(1000)
    const index = recommendationList.value.findIndex((item) => item.id === _id)

    recommendationList.value.splice(index, 1)
    if (recommendationList.value.length === 3) {
        const newRecommendation = await recommendationStore.getRecommendations(
            7
        )
        const newRecommendationWithIndex = newRecommendation.map((item) => ({
            ...item,
            _index: cardGreatesIndex.value++,
        }))
        const newList = _.cloneDeep(recommendationList.value)
        newList.push(...newRecommendationWithIndex)

        recommendationList.value = _.uniqBy(newList, 'id')
    }
}

const handleLike = () => {
    if (!detailInfo.value) return
    dismiss(detailInfo.value?.id)
    recommendationStore.like(detailInfo.value?.username)
    showDetail.value = false
}

const handleDislike = async () => {
    if (!detailInfo.value) return
    dismiss(detailInfo.value?.id)
    await recommendationStore.dislike(detailInfo.value?.username)
    showDetail.value = false
}
const handleStar = async () => {
    if (!detailInfo.value) return
    dismiss(detailInfo.value?.id)
    await recommendationStore.star(detailInfo.value?.username)
    showDetail.value = false
}
</script>

<template>
    <div v-if="auth.loading">auth loading</div>
    <div class="relative flex h-full w-full items-center justify-center">
        <div
            class="absolute aspect-square h-full rounded-full bg-bitter-sweet text-bitter-sweet opacity-20 blur-xl"
        />
        <div
            v-if="pending"
            class="flex h-full w-full items-center justify-center"
        >
            <NSpin />
        </div>
        <template v-if="recommendationList">
            <DatingRecSuggestionCard
                v-for="recommendation in recommendationList"
                :key="recommendation.id"
                :index="2000 - recommendation._index"
                :info-with-images="recommendation"
                @show-detail-btn-click="openDetail"
                @like="recommendationStore.like(recommendation.username)"
                @dislike="recommendationStore.dislike(recommendation.username)"
                @dismiss="dismiss(recommendation.id)"
                @star="recommendationStore.star(recommendation.username)"
            />
        </template>
    </div>
    <DatingRecDetailInformation
        :info="detailInfo"
        :images="detailImages"
        :show="showDetail"
        @close="showDetail = false"
        @like="handleLike"
        @dislike="handleDislike"
        @star="handleStar"
    />
</template>

<style lang="less" scoped></style>
