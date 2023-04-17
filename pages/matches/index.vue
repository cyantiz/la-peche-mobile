<script setup lang="ts">
import { useLoadingBar } from 'naive-ui'

const loadingBar = useLoadingBar()
onMounted(() => {
    if (!process.client) return
    setTimeout(() => loadingBar.finish(), 1)
})
</script>

<template>matches</template>

<style lang="less" scoped></style>
