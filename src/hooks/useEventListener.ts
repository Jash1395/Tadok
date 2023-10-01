import { useEffect, useRef } from 'react'

export const useEventListener = <T extends keyof WindowEventMap>(
    eventName: T,
    handler: (event: WindowEventMap[T]) => void,
    element: EventTarget = window
) => {
    const savedHandler = useRef<(event: WindowEventMap[T]) => void>()

    const eventListener = (event: Event) => {
        if (!savedHandler.current) return
        savedHandler.current(event as WindowEventMap[T])
    }

    useEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {
        element.addEventListener(eventName, eventListener)

        return () => {
            element.removeEventListener(eventName, eventListener)
        }
    }, [eventName, element])
}
