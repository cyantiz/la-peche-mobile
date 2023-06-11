export interface UpdateProfileDTO {
    username: string
    name?: string | null
    gender?: string | null
    status?: string | null
    orientation?: string | null
    biographic?: string | null
    yearOfBirth?: number | null
    bodyType?: string | null
    diet?: string | null
    drinks?: string | null
    drugs?: string | null
    education?: string | null
    ethnicity?: string | null
    height?: number | null
    income?: number | null
    job?: string | null
    location?: string | null
    offspring?: string | null
    pets?: string | null
    sign?: string | null
    smokes?: string | null
    speaks?: string | null
}

export interface InitProfileDTO {
    username: string
    name: string | null
    gender: string | null
    diet: string | null
    drinks: string | null
    drugs: string | null
    education: string | undefined
    ethnicity: string | null
    job: string | undefined
    offspring: string | null
    pets: string | null
    sign: string | null
    smokes: string | null
    speaks: string | null
    yearOfBirth: number | null
    biographic: string | null
    location: string | null
}

export interface UploadImageDTO {
    url: string
    isThumbnail: boolean
    order?: number
}

export interface ChangeImageOrderDTO {
    id: number
    newOrder: number
}

interface IProfileStoreState {
    myInformationWithImages: IUserInformationWithImages | null
    myAvatar: IImage | null
}

export const useProfileStore = defineStore({
    id: 'profile',
    state: () =>
        ({
            myInformationWithImages: null,
            myAvatar: null,
        } as IProfileStoreState),
    actions: {
        async initStore(username: string) {
            const myProfile = await this.getProfile(username)
            this.myInformationWithImages = myProfile
            this.myAvatar =
                myProfile.images.find((image) => image.order === 1) ?? null
        },
        getProfile(username: string) {
            return useApiGet<IUserInformationWithImages>(
                `/users/info-with-images/${username}`
            )
        },
        updateProfile(payload: UpdateProfileDTO) {
            // get username, and other field (store in profileInfo) from payload
            const { username, ...profileInfo } = payload

            return useApiPut<void>(`/users/${username}`, {
                body: { ...profileInfo },
            })
        },
        addImage(payload: UploadImageDTO) {
            // check if url is valid (start with https://res.cloudinary.com and include lapeche)
            const { url } = payload
            const config = useRuntimeConfig()
            const preset = config.public.cloudinaryPreset
            if (
                !url.startsWith('https://res.cloudinary.com') ||
                !url.includes(preset)
            )
                return

            return useApiPost<IImage>('/users/images', {
                body: payload,
            })
        },
        deleteImage(imageId: number | string) {
            return useApiDelete<void>(`/users/images/${+imageId}`)
        },
        changeOrder(payload: ChangeImageOrderDTO) {
            return useApiPut<void>(`/users/images/order/${payload.id}`, {
                body: { order: payload.newOrder },
            })
        },
        initProfile(payload: InitProfileDTO) {
            // get username, and other field (store in profileInfo) from payload
            const { username, ...profileInfo } = payload

            return useApiPut<void>(`/users/${username}`, {
                body: { ...profileInfo, init: true },
            })
        },
        needInitProfile(profile: Partial<IUserInformation>) {
            const {
                diet,
                drinks,
                drugs,
                education,
                ethnicity,
                job,
                offspring,
                pets,
                sign,
                smokes,
                speaks,
                yearOfBirth,
                biographic,
                location,
            } = profile

            return (
                !diet &&
                !drinks &&
                !drugs &&
                !education &&
                !ethnicity &&
                !job &&
                !offspring &&
                !pets &&
                !sign &&
                !smokes &&
                !speaks &&
                !yearOfBirth &&
                !biographic &&
                !location
            )
        },
    },

    getters: {
        myAvatarUrl(): string {
            return (
                this.myAvatar?.url ??
                'https://i0.wp.com/tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png?fit=1024%2C1024&ssl=1&w=640'
            )
        },
    },
})
