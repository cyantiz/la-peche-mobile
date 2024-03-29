<script setup lang="ts">
import { useLoadingBar, NSpin, NButton, NResult } from 'naive-ui'
import { PhSparkle } from 'phosphor-vue'
import { useAuthStore } from '@/store/auth'

defineProps<{}>()

const { user } = useAuthStore()
const localData = ref<IUserInformationWithImages | null>(null)
// test asyncData
const { data, pending, error } = await useAsyncData<IUserInformationWithImages>(
    'GetUserInfoWithImages',
    () =>
        useApiGet<IUserInformationWithImages>(
            `/users/info-with-images/${user.username}`
        ),
    {}
)

const handlePartialUpdateLocalData = (
    newData: Partial<IUserInformationWithImages>
) => {
    if (!localData.value) return

    localData.value = {
        ...localData.value,
        ...newData,
    }
}

const isShowPreview = ref(false)

const loadingBar = useLoadingBar()
onMounted(() => {
    localData.value = data.value
    localData.value?.images.sort((a, b) => a.order - b.order)
    if (!process.client) return
    setTimeout(() => loadingBar.finish(), 1)
})
</script>

<template>
    <div v-if="error" class="flex h-full w-full items-center justify-center">
        <ErrorResult />
    </div>

    <div
        v-else-if="pending"
        class="flex h-full w-full items-center justify-center"
    >
        <NSpin size="large" />
    </div>

    <div
        v-else-if="!localData"
        class="flex h-full w-full items-center justify-center"
    >
        <NResult status="404" title="No data"> </NResult>
    </div>

    <div v-else>
        <div
            class="profile-sections flex w-full flex-col justify-between gap-4 pb-16 xl:flex-row"
        >
            <div class="flex w-full flex-col items-center gap-4">
                <ProfileSectionsBiographic
                    :biographic="localData.biographic"
                    @update="handlePartialUpdateLocalData"
                />
                <ProfileSectionsImages :images="localData.images" />
            </div>

            <div class="flex w-full flex-col items-center gap-4">
                <ProfileSectionsBasic
                    :name="localData.name"
                    :gender="localData.gender"
                    :year-of-birth="localData.yearOfBirth"
                    :height="localData.height"
                    :location="localData.location"
                    :ethnicity="localData.ethnicity"
                    @update="handlePartialUpdateLocalData"
                />

                <ProfileSectionsRelationshipGoal
                    :orientation="localData.orientation"
                    :relationship-goal="'Long-term partner'"
                    @update="handlePartialUpdateLocalData"
                />

                <ProfileSectionsJobAndEducation
                    :job="localData.job"
                    :education="localData.education"
                    :income="localData.income"
                    @update="handlePartialUpdateLocalData"
                />

                <ProfileSectionsAdditionalInfo
                    :speaks="localData.speaks"
                    :offspring="localData.offspring"
                    :pets="localData.pets"
                    :drugs="localData.drugs"
                    :smokes="localData.smokes"
                    :diet="localData.diet"
                    :drinks="localData.drinks"
                    :sign="localData.sign"
                    @update="handlePartialUpdateLocalData"
                />
            </div>

            <div class="absolute bottom-0 left-0 right-0 md:p-4">
                <div
                    class="preview-btn-container h-full w-full rounded-lg bg-white p-4"
                >
                    <NButton size="large" block @click="isShowPreview = true">
                        <template #icon>
                            <PhSparkle />
                        </template>
                        Preview
                    </NButton>
                </div>
            </div>

            <Transition name="fade">
                <PreviewMyProfile
                    v-if="data && isShowPreview"
                    :info-with-images="localData"
                    @close="isShowPreview = false"
                />
            </Transition>
        </div>
    </div>
</template>

<style lang="less" scoped>
.preview-btn-container {
    // background gradient from white -> transparent
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.5) 20%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(255, 255, 255, 1) 100%
    );
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
