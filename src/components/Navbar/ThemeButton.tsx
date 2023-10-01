import styled from 'styled-components'
import { Classic } from '@theme-toggles/react'
import { useStore } from '../../hooks/useStore'
import '@theme-toggles/react/css/Classic.css'

const Button = styled(Classic)<{ $color: string }>`
    margin: 0 1rem 0 0;
    height: '2rem';
    width: '2rem';
    font-size: 1.6rem;
    color: ${(props) => props.$color};
    display: flex;
    align-items: center;
    justify-content: center;
    filter: ${(props) => `drop-shadow(0px 0px 5px ${props.color})`};
`

interface Props {}

export const ThemeButton = ({}: Props) => {
    const { theme, toggleTheme } = useStore()
    const color = `${theme === 'dark' ? 'yellow' : 'orange'}`

    return (
        <Button
            duration={800}
            toggled={theme === 'dark'}
            onToggle={toggleTheme}
            $color={color}
        />
    )
}
