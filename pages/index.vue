<script setup lang="ts">
import { useLoadingBar } from 'naive-ui'
import { useAuthStore } from '~/store/auth'
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

const fakeData = {
    id: 10,
    username: '___user1',
    cluster: null,
    isActivated: true,
    isDeleted: false,
    verifyAt: null,
    premiumEndsAt: null,
    createdAt: '2023-05-18T06:58:52.000Z',
    updatedAt: '2023-05-18T07:30:05.000Z',
    lastOnline: null,
    role: 'USER',
    name: 'Sabrina Carpenter',
    gender: 'female',
    status: 'online',
    orientation: 'Straight',
    biographic:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ratione sed aut omnis dolorum animi totam, culpa illo vitae odio accusamus ullam harum esse a sequi quibusdam cumque vero eum facere!',
    email: 'user1@gmail.com',
    phoneNumber: null,
    yearOfBirth: 1999,
    bodyType: 'A+',
    diet: 'Sometimes',
    drinks: 'Sometimes',
    drugs: 'Never',
    education: 'Oxford University',
    ethnicity: 'Viking',
    height: 160,
    income: 0,
    job: 'Singer',
    location: 'California, US',
    offspring: '',
    pets: '', //
    sign: '',
    smokes: '', //
    speaks: 'English', //
}

const images = ref<IImage[]>([
    {
        id: '2',
        url: 'https://res.cloudinary.com/cyantiz/image/upload/v1684393484/lapeche/user_images/10/10_2_bmgdcv.jpg',
        isThumbnail: false,
        createdAt: '2023-05-18T07:05:25.000Z',
        updatedAt: '2023-05-18T07:05:25.000Z',
    },
    {
        id: '1',
        url: 'https://res.cloudinary.com/cyantiz/image/upload/v1684393488/lapeche/user_images/10/10_1_nik3kz.png',
        isThumbnail: true,
        createdAt: '2023-05-18T07:05:00.000Z',
        updatedAt: '2023-05-18T07:05:00.000Z',
    },

    {
        id: '3',
        url: 'https://res.cloudinary.com/cyantiz/image/upload/v1684393491/lapeche/user_images/10/10_3_rohewx.jpg',
        isThumbnail: false,
        createdAt: '2023-05-18T07:05:34.000Z',
        updatedAt: '2023-05-18T07:05:34.000Z',
    },
    {
        id: '4',
        url: 'https://res.cloudinary.com/cyantiz/image/upload/v1684393481/lapeche/user_images/10/10_4_hrtblr.png',
        isThumbnail: false,
        createdAt: '2023-05-18T07:05:55.000Z',
        updatedAt: '2023-05-18T07:05:55.000Z',
    },
])
const info = ref(fakeData)

const detailImages = ref<IImage[]>([])
const detailInfo = ref<IUserInformation>(fakeData)
const showDetail = ref(false)

const openDetail = (_images: IImage[], _info: IUserInformation) => {
    detailImages.value = _images
    detailInfo.value = _info
    showDetail.value = true
}
</script>

<template>
    <div v-if="auth.loading">auth loading</div>
    <div class="relative flex h-full w-full items-center justify-center">
        <div
            class="absolute bottom-1/2 aspect-square w-[120%] translate-y-1/3 rounded-full bg-bitter-sweet bg-opacity-10 blur-lg lg:w-full 2xl:w-3/4"
        ></div>
        <div class="absolute">
            <PageOrgDatingRecSuggestionCard
                :images="images"
                :info="info"
                @show-detail-btn-click="openDetail"
            />
        </div>
    </div>
    <PageOrgDatingRecDetailInformation
        :images="detailImages"
        :info="detailInfo"
        :show="showDetail"
        @close="showDetail = false"
    />
</template>

<style lang="less" scoped></style>
