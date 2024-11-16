import styled from 'styled-components'
import { httpsCallable } from 'firebase/functions'
import { getFunctions } from 'firebase/functions'
import { Classic } from '@theme-toggles/react'
import { useStore } from '../../hooks/useStore'
import '@theme-toggles/react/css/Classic.css'
import { useAuth } from '../../hooks/useAuth'

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
    const { user } = useAuth()
    const color = `${theme === 'dark' ? 'yellow' : 'orange'}`

    const updateTheme = async (userId: string, theme: Theme) => {
        const functions = getFunctions()
        const updateUserTheme = httpsCallable(functions, 'updateUserTheme')

        try {
            await updateUserTheme({ userId, theme })
        } catch (error) {
            console.error('Error updating theme:', error)
        }
    }

    const handleOnToggle = async () => {
        if (user) {
            toggleTheme()
            await updateTheme(user.uid, theme === 'light' ? 'dark' : 'light')
        } else {
            console.error('No user is signed in.')
        }
    }

    return (
        // TODO
        <Button
            duration={800}
            toggled={theme === 'dark'}
            onToggle={handleOnToggle}
            $color={color}
            placeholder="Button placeholder" // TODO
            onPointerEnterCapture={() => console.log('Pointer entered')} // TODO
            onPointerLeaveCapture={() => console.log('Pointer left')} // TODO
        />
    )
}
