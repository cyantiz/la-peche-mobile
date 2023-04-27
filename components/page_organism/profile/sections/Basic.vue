<script setup lang="ts">
import {
    PhUser,
    PhBaby,
    PhUserFocus,
    PhMapPin,
    PhRuler,
    PhUsersThree,
} from 'phosphor-vue'
import BaseProfileSection from './base/BaseProfileSection.vue'
const props = defineProps<{
    // no using Pick from UserInformation type because of Vue issue (fixed in 3.3.0 but using 3.2.47 now)
    name: string | null
    gender: string | null
    yearOfBirth: number | null
    height: number | null
    location: string | null
    ethnicity: string | null
}>()

const informationRecords = [
    {
        title: 'Name',
        content: props.name,
        iconComponent: PhUser,
    },
    {
        title: 'Gender',
        content: props.gender,
        iconComponent: PhUserFocus,
    },
    {
        title: 'Year of birth',
        content: props.yearOfBirth,
        iconComponent: PhBaby,
    },
    {
        title: 'Height',
        content: props.height,
        iconComponent: PhRuler,
    },
    {
        title: 'Living in',
        content: props.location,
        iconComponent: PhMapPin,
    },
    {
        title: 'Ethnicity',
        content: props.ethnicity,
        iconComponent: PhUsersThree,
    },
]
</script>

<template>
    <BaseProfileSection
        title="Basics information"
        :information-records="informationRecords"
    >
        <template #modal-content> Edit form cho basic information </template>
    </BaseProfileSection>
</template>

<style lang="less" scoped></style>
