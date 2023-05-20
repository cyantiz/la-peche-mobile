<script setup lang="ts">
import {
    PhTranslate,
    PhBaby,
    PhDog,
    PhSmileyWink,
    PhLeaf,
    PhFire,
    PhMartini,
    PhForkKnife,
} from 'phosphor-vue'
import BaseProfileSectionTable from './Base/BaseProfileSectionTable.vue'
const props = defineProps<{
    // no using Pick from UserInformation type because of Vue issue (fixed in 3.3.0 but using 3.2.47 now)
    speaks: string | null
    offspring: string | null
    pets: string | null
    sign: string | null
    drugs: string | null
    smokes: string | null
    diet: string | null
    drinks: string | null
}>()

const informationRecords = [
    {
        title: 'Speaks',
        content: props.speaks,
        iconComponent: PhTranslate,
    },
    {
        title: 'Offspring',
        content: props.offspring,
        iconComponent: PhBaby,
    },
    {
        title: 'Pets',
        content: props.pets,
        iconComponent: PhDog,
    },
    {
        title: 'Sign',
        content: props.sign,
        iconComponent: PhSmileyWink,
    },
    {
        title: 'Drugs',
        content: props.drugs,
        iconComponent: PhLeaf,
    },
    {
        title: 'Smokes',
        content: props.smokes,
        iconComponent: PhFire,
    },
    {
        title: 'Diet',
        content: props.diet,
        iconComponent: PhForkKnife,
    },
    {
        title: 'Drinks',
        content: props.drinks,
        iconComponent: PhMartini,
    },
]
</script>

<template>
    <BaseProfileSectionTable
        title="Additional information"
        :information-records="informationRecords"
    >
        <template #modal-content> Edit form cho basic information </template>
    </BaseProfileSectionTable>
</template>

<style lang="less" scoped></style>
