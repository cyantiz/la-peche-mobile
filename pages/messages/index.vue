<script setup lang="ts">
import { useLoadingBar } from 'naive-ui'

defineProps<{}>()

const loadingBar = useLoadingBar()
onMounted(() => {
    if (!process.client) return
    setTimeout(() => loadingBar.finish(), 1)
})
</script>

<template>messages</template>

<style lang="less" scoped></style>
