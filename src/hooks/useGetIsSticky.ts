import { useRef, useState } from 'react'
import { useEventListener } from './useEventListener'

// sets isSticky to true when the div's current top rect value
// is less than the top value specified in css
export const useGetIsSticky = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [isSticky, setIsSticky] = useState(false)

    const handleScroll = () => {
        const currentElement = containerRef.current
        if (!currentElement) return

        const currentTop = currentElement.getBoundingClientRect().top
        const minTopStr =
            getComputedStyle(currentElement).getPropertyValue('top')
        const minTop = parseInt(minTopStr, 10)

        // check if difference is less than 1px
        // as there can be some rounding errors
        setIsSticky(Math.abs(currentTop - minTop) < 1)
    }

    useEventListener('scroll', handleScroll, window)

    return { containerRef, isSticky }
}
