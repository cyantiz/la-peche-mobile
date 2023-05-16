<script setup lang="ts">
import { NButton } from 'naive-ui'
import { PhSignOut } from 'phosphor-vue'
import { useAuthStore } from '~/store/auth'

const auth = useAuthStore()
const pending = ref(false)
const logout = async () => {
    pending.value = true
    await useDelay(1000)
    auth.logout()
    await useDelay(500)
    pending.value = false
}
</script>

<template>
    <div
        class="custom-shadow flex min-w-[192px] flex-col items-start gap-2 rounded-lg border border-solid border-gray-200 bg-white p-4 text-black"
    >
        <div class="text-lg font-bold">
            {{ auth.user.name }}
        </div>
        <div class="text-base">@{{ auth.user.username }}</div>
        <div class="w-full cursor-pointer">
            <NButton class="mt-4" block :loading="pending" @click="logout">
                <template #icon>
                    <PhSignOut weight="fill" />
                </template>
                Sign out
            </NButton>
        </div>
    </div>
</template>

<style lang="less" scoped>
.custom-shadow {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
