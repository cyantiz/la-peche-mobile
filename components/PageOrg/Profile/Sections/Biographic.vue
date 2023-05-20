<script setup lang="ts">
defineProps<{
    biographic: string | null
}>()
</script>

<template>
    <PageOrgProfileSectionsBaseProfileSection block title="Biographic">
        <template #content>
            <p class="text-center text-base">{{ biographic }}</p>
        </template>
        <template #modal-content> Edit form for biographic </template>
    </PageOrgProfileSectionsBaseProfileSection>
</template>

<style lang="less" scoped></style>
