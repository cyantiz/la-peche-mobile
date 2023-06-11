<script lang="ts" setup>
import { useAreaStore } from './store/area'
import { useAuthStore } from './store/auth'
import { useProfileStore } from './store/profile'
import { useNotificationStore } from './store/notification'
import { ThemeOption } from './theme/config'
import ThemeProvider from './theme/ThemeProvider.vue'
defineProps<{}>()

const area = useAreaStore()
const profile = useProfileStore()
const auth = useAuthStore()
const route = useRoute()
if (process.client) {
    area.init()

    if (auth.user.id) {
        await profile.initStore(useAuthStore().user.username)
        await useNotificationStore().init()

        if (
            profile.needInitProfile({
                ...profile.myInformationWithImages,
            }) &&
            route.path !== '/init-profile'
        ) {
            location.href = '/init-profile'
        }
    }
}

useColorMode({
    attribute: 'theme',
    modes: ThemeOption,
})
</script>
<template>
    <ThemeProvider>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </ThemeProvider>
</template>
