<script setup lang="ts">
defineProps<{
    userChats: Record<string, IUserChat>
    currentChatId: string
}>()
defineEmits(['select-chat'])
</script>

<template>
    <div class="w-16 lg:w-72">
        <div class="flex h-full flex-col gap-1 overflow-y-auto">
            <div class="hidden text-lg font-bold lg:block">Messages</div>
            <ChatListItem
                v-for="(chat, chatId) in userChats"
                :key="chatId"
                :date="chat.date"
                :user-info="chat.userInfo"
                :active="currentChatId === chatId"
                @select="() => $emit('select-chat', chatId)"
            />
        </div>
    </div>
</template>

<style lang="less" scoped></style>
