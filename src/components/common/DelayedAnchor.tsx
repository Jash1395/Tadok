import styled from 'styled-components'
import { useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { buttonPress, buttonDelay } from '../../styles/styles'
import { Link } from 'react-router-dom'

const Anchor = styled(Link)<{
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
    href: string
    delay?: number
    hoverColor?: string
    onClickInstant?: () => void
    onClickDelay?: () => void
    children: ReactNode
}

export const DelayedAnchor = ({
    href,
    delay = buttonDelay,
    hoverColor = 'inital',
    children,
    onClickInstant,
    onClickDelay,
    ...rest
}: Props) => {
    const [isActive, setIsActive] = useState(false)
    const navigate = useNavigate()

    const handleClick = (event: any) => {
        event.preventDefault()

        if (isActive) return
        onClickInstant && onClickInstant()

        if (delay === 0) {
            onClickDelay && onClickDelay()
            navigate(href)
            return
        }
        setIsActive(true)
        setTimeout(() => {
            onClickDelay && onClickDelay()
            navigate(href)
            setIsActive(false)
        }, delay)
    }

    return (
        <Anchor
            to={href}
            onClick={handleClick}
            $delay={delay}
            $hoverColor={hoverColor}
            $isActive={isActive}
            {...rest}
        >
            {children}
        </Anchor>
    )
}
