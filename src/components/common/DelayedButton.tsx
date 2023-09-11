import styled from 'styled-components'
import { useState, ReactNode } from 'react'
import { buttonPress, buttonDelay } from '../../styles'

const Button = styled.button<{
    $delay: number
    $hoverColor: string
    $isActive: boolean
}>`
    width: 4rem;
    height: 4rem;
    border-radius: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
        props.$isActive ? props.$hoverColor : 'inital'};
    transition: background-color 0.3s;
    ${buttonPress}

    @media (hover: hover) and (pointer: fine) {
        &:hover,
        &:active {
            background-color: ${(props) => props.$hoverColor};
        }
    }

    @media (hover: hover) {
        &:active {
            background-color: ${(props) => props.$hoverColor};
        }
    }
`

interface Props {
    onClickInstant?: () => void
    onClickDelay?: () => void
    delay?: number
    hoverColor?: string
    children: ReactNode
}

export const DelayedButton = ({
    onClickInstant,
    onClickDelay,
    delay = buttonDelay,
    hoverColor = 'inital',
    children,
    ...rest
}: Props) => {
    const [isActive, setIsActive] = useState(false)

    const handleClick = () => {
        if (isActive) return
        onClickInstant && onClickInstant()

        if (delay === 0) {
            onClickDelay && onClickDelay()
            return
        }
        setIsActive(true)
        setTimeout(() => {
            onClickDelay && onClickDelay()
            setIsActive(false)
        }, delay)
    }

    return (
        <Button
            onClick={handleClick}
            $delay={delay}
            $hoverColor={hoverColor}
            $isActive={isActive}
            disabled={isActive}
            {...rest}
        >
            {children}
        </Button>
    )
}
