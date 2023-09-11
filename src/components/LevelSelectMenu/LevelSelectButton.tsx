import styled from 'styled-components'
import { useState } from 'react'
import { levelColors } from '../../styles'
import { useStore } from '../../state/store'
import { DelayedButton } from '../common/DelayedButton'
import '../../themes.css'

const Button = styled(DelayedButton)<{
    $backgroundColor: string
    $borderColor: string
    $isHidden: boolean
    $isSelected: boolean
}>`
    width: 75%;
    height: 3.2rem;
    border-radius: 0.3rem;
    box-shadow: 2px 2px 8px -3px #6060607d;
    background-color: ${(props) => props.$backgroundColor};
    color: var(--card-text);
    border-left: 6px solid ${(props) => props.$borderColor};
    opacity: ${(props) => (props.$isHidden ? 0 : 1)};
    transform: ${(props) => (props.$isSelected ? 'scale(1.10)' : 'scale(1)')};
    transition:
        opacity 0.09s ease-in,
        transform 0.11s ease-in,
        background-color 0.2s ease-in-out;
    cursor: ${(props) => `${props.$isHidden ? 'default' : ''}`};
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
    level: Level
    isClickDisabled: boolean
    disableClicking: () => void
}

export const LevelSelectButton = ({
    level,
    isClickDisabled,
    disableClicking,
}: Props) => {
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const { setLevel } = useStore((state) => state.user)

    const levelDescriptions = {
        A1: 'Beginner',
        A2: 'Elementary',
        B1: 'Intermediate',
        B2: 'Upper intermediate',
        C1: 'Advanced',
        C2: 'Proficient',
    }

    const handleClickInstant = () => {
        if (isClickDisabled) return
        setIsSelected(true)
        disableClicking()
    }

    const handleClickDelay = () => {
        if (isClickDisabled) return
        setLevel(level)
    }

    return (
        <Button
            onClickInstant={handleClickInstant}
            onClickDelay={handleClickDelay}
            delay={700}
            hoverColor={levelColors.weak[level]}
            $isHidden={isClickDisabled && !isSelected}
            $isSelected={isSelected}
            $backgroundColor={
                isSelected ? levelColors.weak[level] : 'var(--card-bg)'
            }
            $borderColor={levelColors.full[level]}
        >
            <LevelText>{`${level}`}</LevelText>
            <DescriptionText>{levelDescriptions[level]}</DescriptionText>
        </Button>
    )
}
