import { themeDelay } from '../styles/styles'

const toggleTransitionAll = (elements: Element[], isTransition: boolean) => {
    const transition = isTransition
        ? `background-color ${themeDelay / 1000}s ease-in-out`
        : ''
    elements.forEach((element) => {
        if (!(element instanceof HTMLElement)) return
        element.style.transition = transition
    })
}

export const setThemeDocumentRoot = (theme: Theme) => {
    const allElements = Array.from(document.getElementsByTagName('*'))

    toggleTransitionAll(allElements, true)
    document.documentElement.dataset['theme'] = theme

    setTimeout(() => {
        toggleTransitionAll(allElements, false)
    }, themeDelay)
}
