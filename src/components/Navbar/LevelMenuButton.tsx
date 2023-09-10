import styled from 'styled-components'
import { useState } from 'react'
import { buttonPress, levelColors } from '../../styles'
import { useStore } from '../../state/store'

const Button = styled.button<{
    $backgroundColor: string
}>`
    margin-left: 0.5rem;
    width: 6.2rem;
    height: 2.6rem;
    border-radius: 0.4rem;
    color: white;
    /* background-color: ; */
    /* border-bottom: 1px solid ${(props) => props.$backgroundColor}; */
    box-shadow: 1px 1px 3px 1px #002d44;
    text-shadow: 1px 1px 2px #606060;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease-in-out;
    @media (hover: hover) {
        &:hover {
            background-color: #005783;
        }
    }
    ${buttonPress}
`
const Circle = styled.div<{
    $backgroundColor: string
}>`
    margin-left: 0.2rem;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 999rem;
    background-color: ${(props) => props.$backgroundColor};
`
const Text = styled.p`
    margin-right: 0.4rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: #f3f3f3;
`

interface Props {
    level: Level
}

export const LevelMenuButton = ({ level }: Props) => {
    const [isClickDisabled, setIsClickDisabled] = useState(false)
    const { setLevel } = useStore((state) => state.user)

    const openLevelMenu = () => {
        setLevel(null)
    }

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
            <Text>Level:</Text>
            {level}
            <Circle $backgroundColor={levelColors.full[level]} />
        </Button>
    )
}
