import styled from 'styled-components'
import { useState } from 'react'
import { buttonPress, levelColors } from '../../styles'

const Button = styled.button<{
    $backgroundColor: string
    $color: string
    $isHidden: boolean
    $isSelected: boolean
}>`
    width: 75%;
    height: 3.2rem;
    border-radius: 0.3rem;
    box-shadow: 2px 2px 8px -3px #6060607d;
    background-color: ${(props) => props.$backgroundColor};
    border-left: 6px solid ${(props) => props.$color};
    opacity: ${(props) => (props.$isHidden ? 0 : 1)};
    transform: ${(props) => (props.$isSelected ? 'scale(1.10)' : 'scale(1)')};
    transition:
        opacity 0.09s ease-in,
        transform 0.11s ease-in;
    ${buttonPress}
    &:active {
        transition: background-color 0.2s ease-in;
    }

    display: flex;
    align-items: center;
`

const LevelText = styled.p`
    margin-left: 0.6rem;
    font-size: 1.3rem;
    font-weight: 700;
`

const DescriptionText = styled.p`
    flex: 1;
    margin-right: 2rem;
    font-size: 1rem;
    font-weight: 400;
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

    const levelDescriptions = {
        A1: 'Beginner',
        A2: 'Elementary',
        B1: 'Intermediate',
        B2: 'Upper intermediate',
        C1: 'Advanced',
        C2: 'Proficient',
    }

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
            $backgroundColor={isSelected ? levelColors.weak[level] : 'white'}
            $color={levelColors.full[level]}
            onClick={handleClick}
        >
            <LevelText>{`${level}`}</LevelText>
            <DescriptionText>{levelDescriptions[level]}</DescriptionText>
        </Button>
    )
}
