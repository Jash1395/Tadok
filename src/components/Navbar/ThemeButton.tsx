import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { Classic } from '@theme-toggles/react'
import { themeDelay } from '../../styles'
import '@theme-toggles/react/css/Classic.css'

const Button = styled(Classic)<{ $color: string }>`
    margin: 0 1rem 0 auto;
    height: '2rem';
    width: '2rem';
    font-size: 2rem;
    color: ${(props) => props.$color};
    display: flex;
    align-items: center;
    justify-content: center;
    filter: ${(props) => `drop-shadow(0px 0px 5px ${props.color})`};
`

interface Props {}

export const ThemeButton = ({}: Props) => {
    // get/set from state
    const [theme, setTheme] = useState<Theme>('light')
    const color = `${theme === 'dark' ? 'yellow' : 'orange'}`

    // move to top of app
    useEffect(() => {
        document.documentElement.dataset.theme = theme
    }, [theme])

    // applies or removes transition to ALL elements
    const toggleTransition = (elements: Element[], isTransition: boolean) => {
        const transition = isTransition
            ? `background-color ${themeDelay / 1000}s ease-in-out`
            : ''
        elements.forEach((element) => {
            if (!(element instanceof HTMLElement)) return
            element.style.transition = transition
        })
    }

    const handleClick = () => {
        const allElements = Array.from(document.getElementsByTagName('*'))

        toggleTransition(allElements, true)
        setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))

        setTimeout(() => {
            toggleTransition(allElements, false)
        }, themeDelay)
    }

    return (
        <Button
            duration={800}
            toggled={theme === 'dark'}
            onToggle={handleClick}
            $color={color}
        />
    )
}
