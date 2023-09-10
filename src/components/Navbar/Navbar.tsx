import styled from 'styled-components'
import { LevelMenuButton } from './LevelMenuButton'
import { useState, useEffect } from 'react'

import '@theme-toggles/react/css/Classic.css'
import { Classic } from '@theme-toggles/react'

const Container = styled.div`
    /* padding: 0 */
    width: 100%;
    height: 3.6rem;
    background-color: #00405f;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

interface Props {
    level: Level | null
}

export const Navbar = ({ level }: Props) => {
    const [theme, setTheme] = useState<Theme>('light')

    useEffect(() => {
        document.documentElement.dataset.theme = theme
    }, [theme])

    const handleClick = () => {
        const duration = 0.3
        var allElements = Array.from(document.getElementsByTagName('*'))

        // potential source of performance issue
        allElements.forEach((element) => {
            if (!(element instanceof HTMLElement)) return
            element.style.transition = `background-color ${duration}s ease-in-out`
        })

        setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))

        setTimeout(() => {
            allElements.forEach((element) => {
                if (!(element instanceof HTMLElement)) return
                element.style.transition = ``
            })
        }, duration * 1000)
    }

    return (
        <Container>
            <></>
            {level && <LevelMenuButton level={level} />}
            <div
                style={{
                    marginLeft: 'auto',
                    marginRight: '1rem',
                    height: '2rem',
                    width: '2rem',
                }}
            >
                <Classic
                    duration={750}
                    onToggle={handleClick}
                    toggled={theme === 'dark'}
                    style={{
                        fontSize: '2rem',
                        color: `${theme === 'dark' ? 'yellow' : 'orange'}`,
                        display: 'flex',

                        alignItems: 'center',
                        justifyContent: 'space-between',
                        filter: `drop-shadow(0px 0px 5px ${
                            theme === 'dark' ? 'yellow' : 'orange'
                        })`,
                    }}
                />
            </div>
        </Container>
    )
}
