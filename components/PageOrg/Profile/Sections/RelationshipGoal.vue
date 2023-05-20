<script setup lang="ts">
import { PhEye, PhUserFocus } from 'phosphor-vue'
import BaseProfileSectionTable from './Base/BaseProfileSectionTable.vue'
const props = defineProps<{
    // no using Pick from UserInformation type because of Vue issue (fixed in 3.3.0 but using 3.2.47 now)
    orientation: string | null
    relationshipGoal: string | null
}>()

const informationRecords = [
    {
        title: 'Orientation',
        content: props.orientation,
        iconComponent: PhUserFocus,
    },
    {
        title: 'Relationship Goal',
        content: props.relationshipGoal,
        iconComponent: PhEye,
    },
]
</script>

<template>
    <BaseProfileSectionTable
        title="Relationship goals"
        :information-records="informationRecords"
    >
        <template #modal-content> Edit form cho basic information </template>
    </BaseProfileSectionTable>
</template>

<style lang="less" scoped></style>
