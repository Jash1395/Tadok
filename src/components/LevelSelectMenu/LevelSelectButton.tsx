import styled from 'styled-components'
import { useState } from 'react'
import { buttonPress, levelColors } from '../../styles'

const Button = styled.button<{
    $backgroundColor: string
    $isHidden: boolean
    $isSelected: boolean
}>`
    width: 70%;
    height: 3.4rem;
    border-radius: 0.3rem;
    box-shadow: 2px 2px 8px -3px #6060607d;
    background-color: ${(props) => props.$backgroundColor};
    font-size: 1.4rem;
    font-weight: 700;
    opacity: ${(props) => (props.$isHidden ? 0 : 1)};
    transform: ${(props) => (props.$isSelected ? 'scale(1.15)' : 'scale(1)')};
    transition:
        opacity 0.09s ease-in,
        transform 0.11s ease-in;
    ${buttonPress}
    &:active {
        transition: background-color 0.2s ease-in;
    }
`

interface Props {
    level: level
    isClickDisabled: boolean
    setLevel: (level: level) => void
    disableClicking: () => void
}

export const LevelSelectButton = ({
    level,
    isClickDisabled,
    disableClicking,
    setLevel,
}: Props) => {
    const [isSelected, setIsSelected] = useState<boolean>(false)

    const handleClick = () => {
        if (!isClickDisabled) {
            setIsSelected(true)
            disableClicking()

            setTimeout(() => {
                setLevel(level)
            }, 500)
        }
    }

    return (
        <Button
            $isHidden={isClickDisabled && !isSelected}
            $isSelected={isSelected}
            $backgroundColor={
                isSelected ? levelColors.strong[level] : levelColors.weak[level]
            }
            onClick={handleClick}
        >
            {level}
        </Button>
    )
}
