import styled from 'styled-components'
import { useState } from 'react'
import { levelColors } from '../../styles/styles'
import { DelayedAnchor } from '../common/DelayedAnchor'
import { useValidatedSearchParams } from '../../hooks/useValidatedSearchParams'
import '../../styles/themes.css'

const Anchor = styled(DelayedAnchor)<{
    $backgroundColor: string
    $borderColor: string
    $isHidden: boolean
    $isSelected: boolean
}>`
    width: 50%;
    min-width: 20rem;
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
    display: flex;
    justify-content: center;
`

interface Props {
    level: Level
    isDisabled: boolean
    disable: () => void
}

export const LevelSelectReaderAnchor = ({
    level,
    isDisabled,
    disable,
}: Props) => {
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const { setValidatedSearchParams } = useValidatedSearchParams()

    const levelDescriptions = {
        A1: 'Beginner',
        A2: 'Elementary',
        B1: 'Intermediate',
        B2: 'Upper intermediate',
        C1: 'Advanced',
        C2: 'Proficient',
    }

    const handleClickInstant = () => {
        if (isDisabled) return
        setValidatedSearchParams({ level: level })
        setIsSelected(true)
        disable()
    }

    const handleClickDelay = () => {
        if (isDisabled) return
    }

    return (
        <Anchor
            href={`/reader?level=${level}`}
            onClickInstant={handleClickInstant}
            onClickDelay={handleClickDelay}
            delay={700}
            hoverColor={levelColors.weak[level]}
            $isHidden={isDisabled && !isSelected}
            $isSelected={isSelected}
            $backgroundColor={
                isSelected ? levelColors.weak[level] : 'var(--card-bg)'
            }
            $borderColor={levelColors.full[level]}
        >
            <LevelText>{`${level}`}</LevelText>
            <DescriptionText>{levelDescriptions[level]}</DescriptionText>
        </Anchor>
    )
}
