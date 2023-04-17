<script setup lang="ts">
import { useLoadingBar } from 'naive-ui'
import { useAuthStore } from '~/store/auth'
useHead({
    title: 'Explore',
})
definePageMeta({
    layout: 'default',
})

const auth = useAuthStore()
const user = computed(() => auth.user)

const loadingBar = useLoadingBar()
onMounted(() => {
    if (!process.client) return
    setTimeout(() => loadingBar.finish(), 1)
})
</script>

<template>
    <div v-if="auth.loading">auth loading</div>
    <div v-else>
        logged with user: {{ user }}
        <button @click="auth.logout">logout</button>
    </div>
</template>

<style lang="less" scoped></style>
