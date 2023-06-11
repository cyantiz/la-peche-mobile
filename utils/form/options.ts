import { Diet } from '~/types/enums/Diet'
import { Frequency } from '~/types/enums/Frequency'
import { Offspring } from '~/types/enums/Offspring'
import { Pet } from '~/types/enums/Pet'
import { Zodiac } from '~/types/enums/Zodiac'

export const frequencyOptions = array2NaiveOptions(Object.values(Frequency))
export const offspringOptions = array2NaiveOptions(Object.values(Offspring))
export const zodiacOptions = array2NaiveOptions(Object.values(Zodiac))
export const petsOptions = array2NaiveOptions(Object.values(Pet))
export const dietOptions = array2NaiveOptions(Object.values(Diet))
export const ethnicityOptions = array2NaiveOptions(globalEthnicities)
export const languageOptions = array2NaiveOptions(languages)

export const yearOfBirthOptions = array2NaiveOptions(years)

export const gender: Record<string, string> = {
    m: 'Man',
    f: 'Woman',
    o: 'Others',
}
export const genderOptions = Object.keys(gender).map((key) => ({
    label: gender[key],
    value: key,
}))
