<script setup lang="ts">
import { serverTimestamp } from '@firebase/firestore'
import { useLoadingBar } from 'naive-ui'
import { useAuthStore } from '~/store/auth'
import { useProfileStore } from '~/store/profile'

const props = withDefaults(
    defineProps<{
        infoWithImages: IUserInformationWithImages
        shadow?: boolean
        index: number
    }>(),
    {
        shadow: true,
    }
)

const fireStore = useFirestore()
const auth = useAuthStore()
const profile = useProfileStore()

const loadingBar = useLoadingBar()

const age = computed(() => {
    return (
        useNow().value.getFullYear() - (props.infoWithImages.yearOfBirth ?? 0)
    )
})

const handleMessage = async () => {
    const { id: chatUserId, name, images, username } = props.infoWithImages
    const chatId = [auth.user.id, chatUserId].sort((a, b) => a - b).join('-')

    const doc = await fireStore.getDoc(fireStore.doc('chats', chatId))
    loadingBar.start()
    if (!doc.exists()) {
        await fireStore.setDoc(
            fireStore.doc('chats', chatId),
            { messages: [] },
            {}
        )

        const userChatsDoc1 = await fireStore.getDoc(
            fireStore.doc('userChats', auth.user.id.toString())
        )
        const userChatsDoc2 = await fireStore.getDoc(
            fireStore.doc('userChats', chatUserId.toString())
        )
        if (!userChatsDoc1.exists()) {
            await fireStore.setDoc(
                fireStore.doc('userChats', auth.user.id.toString()),
                {},
                {}
            )
        }
        if (!userChatsDoc2.exists()) {
            await fireStore.setDoc(
                fireStore.doc('userChats', chatUserId.toString()),
                {},
                {}
            )
        }

        await fireStore.updateDoc(
            fireStore.doc('userChats', auth.user.id.toString()),
            {
                [chatId + '.userInfo']: {
                    id: chatUserId,
                    name,
                    username,
                    avatar: images.at(0)?.url,
                },
                [chatId + '.date']: serverTimestamp(),
                [chatId + '.messages']: fireStore.doc('chats', chatId),
            }
        )

        await fireStore.updateDoc(
            fireStore.doc('userChats', chatUserId.toString()),
            {
                [chatId + '.userInfo']: {
                    id: auth.user.id,
                    name: auth.user.name,
                    username: auth.user.username,
                    avatar: profile.myAvatarUrl,
                },
                [chatId + '.date']: serverTimestamp(),
                [chatId + '.messages']: fireStore.doc('chats', chatId),
            }
        )
    }
    useRouter().push(`/messages?chatId=${chatId}`)
}
</script>

<template>
    <ClientOnly>
        <div class="h-full w-full max-w-[90%] p-2 md:w-1/2 xl:w-1/3">
            <div
                class="__info recommendation-card mx-auto flex w-full cursor-pointer select-none flex-col items-center gap-4 overflow-scroll rounded-xl bg-white p-4 sm:max-w-[480px] md:mx-0 md:overflow-auto"
            >
                <div class="relative flex md:w-full">
                    <div class="__info__images flex md:w-full">
                        <DatingRecImageCarousel
                            :images="infoWithImages.images"
                            :slides-per-view="1"
                            :preview-disabled="true"
                        />
                    </div>

                    <div
                        class="__info__text absolute bottom-0 flex w-full flex-col gap-4 rounded-lg bg-gradient-to-t from-black to-transparent p-4"
                    >
                        <div class="flex flex-col">
                            <span
                                class="text-md font-medium text-white sm:text-lg sm:font-bold"
                                >{{ infoWithImages.name }}, {{ age }}</span
                            >
                            <span
                                v-if="infoWithImages.location"
                                class="flex items-center gap-2.5 text-sm font-medium text-gray-200 md:text-base"
                            >
                                <PhMapPin weight="fill" size="18" />
                                {{
                                    removeAreaPrefix(
                                        infoWithImages.location
                                            .split(',')
                                            .slice(3, 4)
                                            .join('')
                                    )
                                }}
                            </span>
                            <p
                                v-if="infoWithImages.education"
                                class="flex w-full items-center gap-2.5 overflow-hidden text-sm font-medium text-gray-200 md:text-base"
                            >
                                <PhGraduationCap weight="fill" size="18" />
                                <span
                                    class="w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
                                >
                                    {{ infoWithImages.education }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="actions flex items-start gap-6">
                    <DatingRecActionButton
                        type="message"
                        @button-click="handleMessage"
                    />
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<style lang="less" scoped>
.recommendation-card {
    @media (max-width: 768px) {
        transform: none;
        box-shadow: none;
        overflow: hidden;
    }
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>
