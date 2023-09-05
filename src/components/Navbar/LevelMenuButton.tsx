import styled from 'styled-components'
import { useState } from 'react'
import { buttonPress, levelColors } from '../../styles'

const Button = styled.button<{
    $backgroundColor: string
}>`
    margin-left: 1rem;
    width: 4rem;
    height: 2rem;
    border-radius: 0.4rem;
    color: white;
    background-color: ${(props) => props.$backgroundColor};
    text-shadow: 1px 1px 2px #606060;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    ${buttonPress}
`

interface Props {
    level: level
    openLevelMenu: () => void
}

export const LevelMenuButton = ({ level, openLevelMenu }: Props) => {
    const [isClickDisabled, setIsClickDisabled] = useState(false)

    const handleClick = () => {
        if (!isClickDisabled) {
            setIsClickDisabled(true)

            setTimeout(() => {
                openLevelMenu()
                setIsClickDisabled(false)
            }, 200)
        }
    }
    return (
        <Button
            $backgroundColor={levelColors.strong[level]}
            onClick={handleClick}
        >
            {level}
        </Button>
    )
}
