<!-- eslint-disable camelcase -->
<script setup lang="ts">
import { PhImage, PhPaperPlaneRight, PhTrash } from 'phosphor-vue'
import { NSpin, useNotification } from 'naive-ui'
const emits = defineEmits(['submit-message-text', 'submit-message-image'])

const cloudinary = useCloudinary()
const notification = useNotification()
const image = ref<File | undefined>(undefined)
const uploadingImage = ref<boolean>(false)

const handleImageUpload = (payload: Event) => {
    const target = payload.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return
    image.value = file
    console.log(image.value)
}

const SendMsg = async (event: any) => {
    if (image.value) {
        try {
            uploadingImage.value = true
            console.log(image.value)
            const { secure_url } = await cloudinary.upload(
                image.value,
                'chat-images'
            )
            console.log(secure_url)
            emits('submit-message-image', secure_url)
            event.target.reset()
            image.value = undefined
        } catch (error) {
            notification.error({
                title: 'Error',
                content: 'Error uploading image',
                duration: 2000,
            })
        } finally {
            uploadingImage.value = false
        }
        return
    }

    const msg = event.target?.elements.msg.value as string
    if (!msg) return
    emits('submit-message-text', msg)
    // clear input
    event.target.reset()
}

const imageUrl = computed(() => {
    if (!image.value) return ''
    return URL.createObjectURL(image?.value)
})
</script>

<template>
    <form
        class="flex gap-2 pb-4 text-xs transition-all md:pb-0 md:text-sm"
        autocomplete="off"
        @submit.prevent="SendMsg"
    >
        <input
            v-if="!image"
            type="text"
            name="msg"
            placeholder="Enter your message"
            class="flex-1 rounded-lg border-0 bg-[#F0F2F5] px-4 py-2 outline-none"
        />
        <div v-else class="flex flex-1 items-center gap-2 bg-[#F0F2F5] p-2">
            <img :src="imageUrl" class="w-48 rounded-lg" />
            <div
                class="hover:bg-theme flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:text-white"
                @click="image = undefined"
            >
                <PhTrash :size="20" />
            </div>
        </div>
        <label
            for="chat-upload-image"
            class="text-theme hover: flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent hover:bg-black hover:bg-opacity-5"
        >
            <PhImage weight="fill" :size="20" />
        </label>
        <input
            id="chat-upload-image"
            accept="image/*"
            type="file"
            class="hidden"
            name="image"
            @change="handleImageUpload"
        />
        <div
            v-if="uploadingImage"
            class="flex h-10 w-10 items-center justify-center"
        >
            <NSpin size="small" />
        </div>
        <button
            v-else
            type="submit"
            class="text-theme hover: flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-none bg-transparent hover:bg-black hover:bg-opacity-5"
        >
            <PhPaperPlaneRight weight="fill" :size="20" />
        </button>
    </form>
</template>

<style lang="less" scoped></style>
