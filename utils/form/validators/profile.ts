import { FormRules } from 'naive-ui'

export const initProfileFormRules1: FormRules = {
    name: [
        {
            required: true,
            message: 'Please enter your name',
            trigger: 'blur',
        },
        {
            min: 2,
            max: 20,
            message: 'Name length should be between 2 and 36 characters',
            trigger: 'blur',
        },
    ],
    gender: [
        {
            required: true,
            message: 'Please select your gender',
            trigger: 'blur',
        },
    ],
}

export const initProfileFormRules2: FormRules = {
    biographic: [
        {
            required: true,
            message: 'Please enter your biographic',
            trigger: 'blur',
        },
    ],
    ethnicity: [
        {
            required: true,
            message: 'Please select your ethnicity',
            trigger: 'blur',
        },
    ],
    sign: [
        {
            required: true,
            message: 'Please select sign',
            trigger: 'blur',
        },
    ],
    speaks: [
        {
            required: true,
            message: 'Please enter speaks',
            trigger: 'blur',
        },
    ],
}

export const initProfileFormRules3: FormRules = {
    education: [
        {
            required: true,
            message: 'Please enter your university',
            trigger: 'blur',
        },
    ],
    job: [
        {
            required: true,
            message: 'Please enter your job',
            trigger: 'blur',
        },
    ],
}

export const initProfileFormRules4: FormRules = {
    diet: [
        {
            required: true,
            message: 'Please select your diet',
            trigger: 'blur',
        },
    ],
    drinks: [
        {
            required: true,
            message: 'Please select drinks',
            trigger: 'blur',
        },
    ],
    drugs: [
        {
            required: true,
            message: 'Please select drugs',
            trigger: 'blur',
        },
    ],
    smokes: [
        {
            required: true,
            message: 'Please select smokes',
            trigger: 'blur',
        },
    ],
    offspring: [
        {
            required: true,
            message: 'Please select offspring',
            trigger: 'blur',
        },
    ],
    pets: [
        {
            required: true,
            message: 'Please select pets',
            trigger: 'blur',
        },
    ],
}
