<script setup lang="ts">
import BaseProfileSection from './base/BaseProfileSection.vue'
defineProps<{
    biographic: string | null
}>()
</script>

<template>
    <BaseProfileSection block title="Biographic">
        <template #content>
            <p>{{ biographic }}</p>
        </template>
        <template #modal-content> Edit form for biographic </template>
    </BaseProfileSection>
</template>

<style lang="less" scoped></style>
