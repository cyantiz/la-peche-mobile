<script setup lang="ts">
import { useLoadingBar } from 'naive-ui'
import { useAuthStore } from '@/store/auth'
import BasicSection from '@/components/page_organism/profile/sections/Basic.vue'
import RelationShipGoalSection from '@/components/page_organism/profile/sections/RelationshipGoal.vue'
defineProps<{}>()

const { user } = useAuthStore()

// test asyncData
const { data, pending, error } = await useAsyncData<UserInformation>(() => {
    return useApiGet<UserInformation>(`/users/info/${user.username}`)
})

const loadingBar = useLoadingBar()
onMounted(() => {
    if (!process.client) return
    setTimeout(() => loadingBar.finish(), 1)
})
</script>

<template>
    <div v-if="error">
        <h1>Error</h1>
        <p>{{ error }}</p>
    </div>

    <div v-else-if="pending">
        <h1>Loading...</h1>
    </div>

    <div v-else-if="!data">
        <h1>No data</h1>
    </div>

    <div v-else>
        <p>{{ data }}</p>
        <div
            class="profile-sections my-2 flex w-full flex-col items-center justify-center gap-4"
        >
            <BasicSection
                :name="data.name"
                :gender="data.gender"
                :year-of-birth="data.yearOfBirth"
                :height="data.height"
                :location="data.location"
                :ethnicity="data.ethnicity"
            ></BasicSection>

            <RelationShipGoalSection
                :orientation="data.orientation"
                :relationship-goal="'Long-term partner'"
            ></RelationShipGoalSection>
        </div>
    </div>
</template>

<style lang="less" scoped></style>
