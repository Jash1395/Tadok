import { useSearchParams } from 'react-router-dom'
import { validSearchParams } from '../typesExported'
import { validateLevel } from '../utils/validateLevel'

// seperate functions to validate each type(key) of param
const validateParam = (key: ValidSearchParam, obj: any): Level | undefined => {
    switch (key) {
        case 'level':
            return validateLevel(obj[key])
        default:
            return undefined
    }
}

const validateSearchParams = (obj: UnvalidatedParam): SearchParamsState => {
    const validKeys = validSearchParams

    const reducer = (accumulator: SearchParamsState, key: ValidSearchParam) => {
        const value = validateParam(key, obj)

        if (obj.hasOwnProperty(key) && value)
            return { ...accumulator, [key]: value }

        return accumulator
    }

    const searchParamsState = validKeys.reduce(reducer, {})
    return searchParamsState
}

export const useValidatedSearchParams = (): {
    validatedSearchParams: SearchParamsState
    setValidatedSearchParams: (newSearchParams: SearchParamsState) => void
} => {
    const [searchParams, setSearchParams] = useSearchParams()

    const setValidatedSearchParams = (newParams: SearchParamsState) => {
        setSearchParams(newParams)
    }

    const unvalidatedSearchParams: UnvalidatedParam =
        Object.fromEntries(searchParams)
    const validatedSearchParams = validateSearchParams(unvalidatedSearchParams)

    return {
        validatedSearchParams: validatedSearchParams,
        setValidatedSearchParams: setValidatedSearchParams,
    }
}
