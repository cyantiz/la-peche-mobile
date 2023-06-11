<script setup lang="ts">
import {
    NForm,
    NFormItem,
    NInput,
    NSelect,
    NAutoComplete,
    useLoadingBar,
    NButton,
    NSteps,
    NStep,
    FormInst,
    FormValidationError,
    useNotification,
} from 'naive-ui'
import { PhSignOut, PhArrowRight, PhCheck, PhArrowLeft } from 'phosphor-vue'
import { useAreaStore } from '~/store/area'
import { useAuthStore } from '~/store/auth'
import { InitProfileDTO, useProfileStore } from '~/store/profile'
import {
    frequencyOptions,
    offspringOptions,
    zodiacOptions,
    petsOptions,
    dietOptions,
    ethnicityOptions,
    languageOptions,
    genderOptions,
    yearOfBirthOptions,
} from '~/utils/form/options'

import {
    initProfileFormRules1,
    initProfileFormRules2,
    initProfileFormRules3,
    initProfileFormRules4,
} from '~/utils/form/validators/profile'
definePageMeta({
    layout: 'blank',
})
defineProps<{}>()

const auth = useAuthStore()
const area = useAreaStore()
const profile = useProfileStore()
const loadingBar = useLoadingBar()
const notification = useNotification()

const pending = ref<boolean>(false)
const currentStep = ref<number>(1)

type InitProfileDTO1 = Pick<InitProfileDTO, 'name' | 'gender' | 'yearOfBirth'>
type InitProfileDTO2 = Pick<
    InitProfileDTO,
    'biographic' | 'ethnicity' | 'sign' | 'speaks'
>
type InitProfileDTO3 = Pick<InitProfileDTO, 'education' | 'job' | 'location'>
type InitProfileDTO4 = Pick<
    InitProfileDTO,
    'pets' | 'diet' | 'drinks' | 'drugs' | 'smokes' | 'offspring'
>

const form1 = ref<InitProfileDTO1>({
    name: profile.myInformationWithImages?.name ?? null, //
    gender: null, //
    yearOfBirth: 1900, //
})
const form2 = ref<InitProfileDTO2>({
    biographic: null, //
    ethnicity: null, //
    sign: null, //
    speaks: null,
})
const form3 = ref<InitProfileDTO3>({
    education: undefined, //
    job: undefined, //
    location: null, //
})
const form4 = ref<InitProfileDTO4>({
    pets: null, //
    diet: null, //
    drinks: null, //
    drugs: null, //
    smokes: null, //
    offspring: null, //
})
const formRef1 = ref<FormInst | null>(null)
const formRef2 = ref<FormInst | null>(null)
const formRef3 = ref<FormInst | null>(null)
const formRef4 = ref<FormInst | null>(null)
const speaks = ref([])
watch(
    () => speaks.value,
    (value) => {
        form2.value.speaks = value.join(', ')
    },
    { deep: true }
)

const areaCode = reactive<{
    province: string | null
    district: string | null
    commune: string | null
}>({
    province: '48',
    district: '492',
    commune: '20236',
})
const provinceOptions = computed(() => area2NaiveOptions(area.provinces))
const districtOptions = computed(() =>
    areaCode.province
        ? area2NaiveOptions(area.listDistrictsByProvinceCode(areaCode.province))
        : []
)
const communeOptions = computed(() =>
    areaCode.district
        ? area2NaiveOptions(area.listCommunesByDistrictCode(areaCode.district))
        : []
)
const locationString = computed(() => {
    if (!areaCode.commune || !areaCode.district || !areaCode.province)
        return null
    const commune = area.communeByCode(areaCode.district, areaCode.commune)
    const result = `${areaCode.province},${areaCode.district},${areaCode.commune},${commune?.province},${commune?.district},${commune?.name}`
    form3.value.location = result
    return result
})
console.log(locationString, auth)

const jobOptions = computed(() => {
    if (!form3.value.job?.length) return jobTitles

    return jobTitles.filter((item) =>
        item.toLowerCase().includes(form3.value.job?.toLowerCase() ?? '')
    )
})
const universityOptions = computed(() => {
    if (!form3.value.education?.length) return universities

    return universities.filter((item) =>
        item.toLowerCase().includes(form3.value.education?.toLowerCase() ?? '')
    )
})

const handleSteps = () => {
    switch (currentStep.value) {
        case 1:
            formRef1.value?.validate(
                (errors: FormValidationError[] | undefined) => {
                    if (!errors) {
                        currentStep.value++
                    } else {
                        errors.forEach((item) =>
                            item.forEach((error) => {
                                notification.error({
                                    title: error.message,
                                    duration: 2000,
                                })
                            })
                        )
                    }
                }
            )
            break
        case 2:
            formRef2.value?.validate(
                (errors: FormValidationError[] | undefined) => {
                    if (!errors) {
                        currentStep.value++
                    } else {
                        errors.forEach((item) =>
                            item.forEach((error) => {
                                notification.error({
                                    title: error.message,
                                    duration: 2000,
                                })
                            })
                        )
                    }
                }
            )
            break
        case 3:
            formRef3.value?.validate(
                (errors: FormValidationError[] | undefined) => {
                    if (!errors) {
                        currentStep.value++
                    } else {
                        errors.forEach((item) =>
                            item.forEach((error) => {
                                notification.error({
                                    title: error.message,
                                    duration: 2000,
                                })
                            })
                        )
                    }
                }
            )
            break
        case 4:
            formRef4.value?.validate(
                async (errors: FormValidationError[] | undefined) => {
                    if (!errors) {
                        pending.value = true
                        await profile.initProfile({
                            username: auth.user.username,
                            ...form1.value,
                            ...form2.value,
                            ...form3.value,
                            ...form4.value,
                        })
                        pending.value = false
                        location.href = '/'
                    } else {
                        errors.forEach((item) =>
                            item.forEach((error) => {
                                notification.error({
                                    title: error.message,
                                    duration: 2000,
                                })
                            })
                        )
                    }
                }
            )
            break
    }
}
onMounted(() => {
    if (!process.client) return
    setTimeout(() => loadingBar.finish(), 1)
})

watch(
    () => areaCode.province,
    (value) => {
        areaCode.district = null
        if (!value) return
        area.fetchDistricts(value)
    }
)

watch(
    () => areaCode.district,
    (value) => {
        areaCode.commune = null
        if (!value) return
        area.fetchCommunes(value)
    }
)
</script>

<template>
    <ClientOnly>
        <div class="flex h-screen w-full flex-col items-center">
            <NButton class="my-2" @click="auth.logout">
                <template #icon>
                    <PhSignOut />
                </template>
                Logout
            </NButton>
            <div class="mb-4">
                <h1 class="text-theme text-center text-2xl font-bold">
                    Create your dating profile
                </h1>
                <p class="text-center text-gray-500">
                    Please fill in the information below to complete your
                    profile
                </p>
            </div>
            <NSteps
                :current="currentStep"
                style="
                    max-width: 800px;
                    margin-inline: auto;
                    padding-inline: 48px;
                    margin-bottom: 28px;
                    width: 100%;
                "
                size="small"
            >
                <NStep title="Very basic" />
                <NStep title="Introduce" />
                <NStep title="Background" />
                <NStep title="Hobbies" />
            </NSteps>

            <div class="mb-1 w-full px-8 py-4 md:w-[600px] xl:w-[800px]">
                <NForm
                    v-show="currentStep === 1"
                    ref="formRef1"
                    class="flex w-full flex-col gap-2"
                    :model="form1"
                    label-placement="top"
                    label-width="120px"
                    label-align="left"
                    :rules="initProfileFormRules1"
                    @submit.prevent="handleSteps"
                >
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Name"
                        path="name"
                    >
                        <NInput
                            v-model:value="form1.name"
                            placeholder="John Doe"
                            :input-props="{ autocomplete: 'off' }"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Gender"
                        path="gender"
                    >
                        <NSelect
                            v-model:value="form1.gender"
                            placeholder="Select your gender"
                            :input-props="{ autocomplete: 'off' }"
                            :options="genderOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Year of birth"
                        path="birth"
                    >
                        <NSelect
                            v-model:value="form1.yearOfBirth"
                            placeholder="Which year were you born?"
                            filterable
                            :input-props="{ autocomplete: 'off' }"
                            :options="yearOfBirthOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                </NForm>

                <NForm
                    v-show="currentStep === 2"
                    ref="formRef2"
                    class="flex w-full flex-col gap-2"
                    :model="form2"
                    label-placement="top"
                    label-width="120px"
                    label-align="left"
                    :rules="initProfileFormRules2"
                    @submit.prevent="handleSteps"
                >
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Biographic"
                        path="biographic"
                    >
                        <NInput
                            v-model:value="form2.biographic"
                            type="textarea"
                            placeholder="Basic Textarea"
                            :input-props="{ autocomplete: 'off' }"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Ethnicity"
                        path="ethnicity"
                    >
                        <NSelect
                            v-model:value="form2.ethnicity"
                            placeholder="E.g: Vietnamese"
                            filterable
                            :input-props="{ autocomplete: 'off' }"
                            :options="ethnicityOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Speaks"
                        path="speaks"
                    >
                        <NSelect
                            v-model:value="speaks"
                            :options="languageOptions"
                            placeholder="Select your language"
                            filterable
                            multiple
                            :input-props="{ autocomplete: 'off' }"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Zodiac"
                        path="sign"
                    >
                        <NSelect
                            v-model:value="form2.sign"
                            placeholder="Select your sign"
                            :input-props="{ autocomplete: 'off' }"
                            :options="zodiacOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                </NForm>

                <NForm
                    v-show="currentStep === 3"
                    ref="formRef3"
                    class="flex w-full flex-col gap-2"
                    :model="form3"
                    label-placement="top"
                    label-width="120px"
                    label-align="left"
                    :rules="initProfileFormRules3"
                    @submit.prevent="handleSteps"
                >
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Job title"
                        path="job"
                    >
                        <NAutoComplete
                            v-model:value="form3.job"
                            :get-show="() => true"
                            :options="jobOptions"
                            placeholder="E.g. Software Engineer"
                            :input-props="{ autocomplete: 'off' }"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="University"
                        path="education"
                    >
                        <NAutoComplete
                            v-model:value="form3.education"
                            :get-show="() => true"
                            :options="universityOptions"
                            placeholder="E.g. Harvard University"
                            :input-props="{ autocomplete: 'off' }"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem size="large" :show-label="true" label="Province">
                        <NSelect
                            v-model:value="areaCode.province"
                            placeholder="Province"
                            filterable
                            :input-props="{ autocomplete: 'off' }"
                            :options="provinceOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem size="large" :show-label="true" label="District">
                        <NSelect
                            v-model:value="areaCode.district"
                            placeholder="District"
                            filterable
                            :input-props="{ autocomplete: 'off' }"
                            :options="districtOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem size="large" :show-label="true" label="Commune">
                        <NSelect
                            v-model:value="areaCode.commune"
                            placeholder="Commune"
                            filterable
                            :input-props="{ autocomplete: 'off' }"
                            :options="communeOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                </NForm>

                <NForm
                    v-show="currentStep === 4"
                    ref="formRef4"
                    class="flex w-full flex-col gap-2"
                    :model="form4"
                    label-placement="top"
                    label-width="120px"
                    label-align="left"
                    :rules="initProfileFormRules4"
                    @submit.prevent="handleSteps"
                >
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Diet"
                        path="diet"
                    >
                        <NSelect
                            v-model:value="form4.diet"
                            placeholder="Select your diet"
                            :input-props="{ autocomplete: 'off' }"
                            :options="dietOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Drugs"
                        path="drugs"
                    >
                        <NSelect
                            v-model:value="form4.drugs"
                            placeholder="Please select"
                            :input-props="{ autocomplete: 'off' }"
                            :options="frequencyOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Smokes"
                        path="smokes"
                    >
                        <NSelect
                            v-model:value="form4.smokes"
                            placeholder="Please select"
                            :input-props="{ autocomplete: 'off' }"
                            :options="frequencyOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Drinks"
                        path="drinks"
                    >
                        <NSelect
                            v-model:value="form4.drinks"
                            placeholder="Please select"
                            :input-props="{ autocomplete: 'off' }"
                            :options="frequencyOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>

                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Offspring"
                        path="sign"
                    >
                        <NSelect
                            v-model:value="form4.offspring"
                            placeholder="Please Select"
                            :input-props="{ autocomplete: 'off' }"
                            :options="offspringOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                    <NFormItem
                        size="large"
                        :show-label="true"
                        label="Pets"
                        path="pets"
                    >
                        <NSelect
                            v-model:value="form4.pets"
                            placeholder="Select pet"
                            :input-props="{ autocomplete: 'off' }"
                            :options="petsOptions"
                            @keydown.enter.prevent
                        />
                    </NFormItem>
                </NForm>
            </div>
            <div
                class="mb-4 flex w-full justify-between gap-2 px-8 md:w-[600px] xl:w-[800px]"
            >
                <NButton
                    v-if="currentStep !== 1"
                    :loading="pending"
                    :disabled="pending"
                    type="default"
                    size="large"
                    class="w-1/3"
                    @click="handleSteps"
                >
                    <template #icon>
                        <PhArrowLeft />
                    </template>
                    Previous
                </NButton>
                <NButton
                    :loading="pending"
                    :disabled="pending"
                    type="default"
                    size="large"
                    :class="currentStep === 1 ? 'w-full' : 'w-1/3'"
                    @click="handleSteps"
                >
                    <template #icon>
                        <PhCheck v-if="currentStep === 4" />
                        <PhArrowRight v-else />
                    </template>
                    <template v-if="currentStep === 4"> Done </template>
                    <template v-else>Next step</template>
                </NButton>
            </div>
        </div>
    </ClientOnly>
</template>

<style lang="less" scoped></style>
