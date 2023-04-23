import { Role } from './enums/Role'

declare global {
    interface User {
        id: number | null
        username: string | null
        cluster: number | null
        isActivated: boolean | null
        isDeleted: boolean | null
        verifyAt: Date | null
        premiumEndsAt: Date | null
        createdAt: Date | null
        updatedAt: Date | null
        lastOnline: Date | null
        role: Role | null
        name: string | null
        gender: string | null
        status: string | null
        orientation: string | null
        biographic: string | null
        email: string | null
        phoneNumber: string | null
        yearOfBirth: number | null
        bodyType: string | null
        diet: string | null
        drinks: string | null
        drugs: string | null
        education: string | null
        ethnicity: string | null
        height: number | null
        income: number | null
        job: string | null
        location: string | null
        offspring: string | null
        pets: string | null
        sign: string | null
        smokes: string | null
        speaks: string | null
    }

    type UserInformation = Omit<
        User,
        | 'id'
        | 'username'
        | 'cluster'
        | 'isActivated'
        | 'isDeleted'
        | 'verifyAt'
        | 'premiumEndsAt'
        | 'createdAt'
        | 'updatedAt'
        | 'lastOnline'
        | 'role'
    >
}
