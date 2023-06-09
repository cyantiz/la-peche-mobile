<script setup lang="ts">
import { NResult } from 'naive-ui'
import { useAuthStore } from '~/store/auth'

defineProps<{
    messages: IMessage[]
    chatUserInfo: IChatUserInfo
}>()
defineEmits(['submit-message-text', 'submit-message-image'])

const auth = useAuthStore()
</script>

<template>
    <div class="flex h-full w-full flex-col justify-between gap-2">
        <div v-if="chatUserInfo" class="flex items-center gap-4">
            <Avatar :src="chatUserInfo.avatar" :size="48" />
            <div class="flex-1 pb-1">
                <p
                    class="overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold"
                >
                    {{ chatUserInfo.name }}
                </p>
                <p class="text-xs">@{{ chatUserInfo.username }}</p>
            </div>
        </div>
        <div
            v-if="!messages.length"
            class="flex h-full w-full items-center justify-center"
        >
            <NResult status="404" title="No messages yet" />
        </div>
        <div v-else class="h-full w-full overflow-y-auto pr-2 md:pr-0">
            <ChatBoxMessage
                v-for="message in messages"
                :key="message.createdAt.seconds"
                :text="message.text"
                :self="message.sender === auth.user.id"
            >
            </ChatBoxMessage>
        </div>
        <ChatMessageInput
            @submit-message-text="$emit('submit-message-text', $event)"
            @submit-message-image="$emit('submit-message-image', $event)"
        />
    </div>
</template>

<style lang="less" scoped></style>
