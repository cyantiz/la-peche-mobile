<!-- eslint-disable camelcase -->
<script setup lang="ts">
import { arrayUnion, Timestamp } from '@firebase/firestore'
import { useLoadingBar } from 'naive-ui'
import { useAuthStore } from '~/store/auth'

defineProps<{}>()

const loadingBar = useLoadingBar()
const fireStore = useFirestore()
const auth = useAuthStore()

const userChats = ref<Record<string, IUserChat> | undefined>(undefined)
const currentChatId = ref<string>('')
const currentChatMessages = ref<IChat | undefined>(undefined)
const loadingMessages = ref<boolean>(false)

onMounted(() => {
    if (!process.client) return
    setTimeout(() => loadingBar.finish(), 1)

    const docRef = fireStore.doc('userChats', auth.user.id.toString())

    const unsubscribe = fireStore.onSnapShot<Record<string, IUserChat>>(
        docRef,
        (doc) => {
            userChats.value = doc.data()
        }
    )

    onUnmounted(() => {
        unsubscribe()
    })
})

const sendMsgText = (msg: string) => {
    if (!msg || !msg?.length) return

    const message = {
        text: msg,
        sender: auth.user.id,
        createdAt: Timestamp.now(),
    }

    const docRef = fireStore.doc('chats', currentChatId.value)

    fireStore.updateDoc(docRef, {
        messages: arrayUnion(message),
    })
}

const sendMsgImage = (url: string) => {
    const message = {
        text: `[image](${url})`,
        sender: auth.user.id,
        createdAt: Timestamp.now(),
    }

    const docRef = fireStore.doc('chats', currentChatId.value)

    fireStore.updateDoc(docRef, {
        messages: arrayUnion(message),
    })
}

let unsubscribeChat = () => {}

watch(
    () => currentChatId.value,
    async (newVal) => {
        loadingMessages.value = true
        if (!userChats.value) return
        if (unsubscribeChat) unsubscribeChat()

        await useDelay(500)

        unsubscribeChat = fireStore.onSnapShot<IChat>(
            userChats.value[newVal].messages,
            (doc) => {
                loadingMessages.value = false
                currentChatMessages.value = doc.data()
            }
        )
    }
)
</script>

<template>
    <ClientOnly>
        <div v-if="!userChats" class="flex h-full">
            <SkeletonChatList />
            <div class="h-full w-0.5 bg-gray-200"></div>
        </div>
        <div v-else class="flex h-full gap-2">
            <ChatList
                :user-chats="userChats"
                :current-chat-id="currentChatId"
                @select-chat="currentChatId = $event"
            />
            <div class="h-full w-0.5 bg-gray-200"></div>
            <template v-if="loadingMessages">
                <SkeletonChatBox />
            </template>

            <template v-else>
                <ChatBox
                    v-if="currentChatMessages"
                    :chat-user-info="userChats[currentChatId].userInfo"
                    :messages="currentChatMessages?.messages"
                    @submit-message-text="sendMsgText"
                    @submit-message-image="sendMsgImage"
                />
                <div
                    v-else
                    class="flex h-full w-full items-center justify-center text-lg font-bold text-inactive"
                >
                    Select a chat or start a new conversation
                </div>
            </template>
        </div>
    </ClientOnly>
</template>

<style lang="less" scoped></style>
