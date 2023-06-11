interface IRecommendationStoreState {
    numberOfMatches: number
}

export const useRecommendationStore = defineStore({
    id: 'recommendation',
    state: () =>
        ({
            numberOfMatches: 0,
        } as IRecommendationStoreState),
    actions: {
        getRecommendations(
            quantity = 5
        ): Promise<IUserInformationWithImages[]> {
            return useApiGet('/users/recommended', {
                query: { quantity },
            })
        },
        getMatcheds(
            page = 1,
            pageSize = 6
        ): Promise<IUserInformationWithImages[]> {
            return useApiGet(`/users/matched?page=${page}&pageSize=${pageSize}`)
        },
        getMatchedCount(): Promise<number> {
            return useApiGet('/users/matched-count')
        },
        getBookmarkeds(
            page = 1,
            pageSize = 6
        ): Promise<IUserInformationWithImages[]> {
            return useApiGet(`/users/starred?page=${page}&pageSize=${pageSize}`)
        },
        getBookmarkedCount(): Promise<number> {
            return useApiGet('/users/starred-count')
        },
        like(username: string | null): Promise<unknown> {
            if (!username || !username?.length) {
                console.log('err no username')
                return useDelay(1)
            }

            return useApiPost('/users/like', {
                body: {
                    username,
                },
            })
        },
        dislike(username: string | null): Promise<unknown> {
            console.log('username', username)
            if (!username || !username?.length) {
                console.log('err no username')
                return useDelay(1)
            }

            return useApiPost('/users/skip', {
                body: {
                    username,
                },
            })
        },
        star(username: string | null): Promise<unknown> {
            if (!username || !username?.length) {
                console.log('err no username')
                return useDelay(1)
            }

            return useApiPost('/users/star', {
                body: {
                    username,
                },
            })
        },
    },

    getters: {},
})
