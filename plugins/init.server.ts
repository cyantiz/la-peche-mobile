import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '@/store/auth'
// import { useProfileStore } from '~/store/profile'
// import { useNotificationStore } from '~/store/notification'

export default defineNuxtPlugin(async () => {
    await useAuthStore().initAuth()

    // if (useAuthStore().user.id) {
    //     await useProfileStore().init(useAuthStore().user.username)
    //     await useNotificationStore().init()
    // }
})
