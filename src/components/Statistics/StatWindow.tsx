import styled from 'styled-components'
import { ReactNode } from 'react'

const Container = styled.div<{ $height: string; $width: string }>`
    height: ${(props) => props.$height};
    width: ${(props) => props.$width};
    background-color: var(--card-bg);
    border-radius: 1em;
    box-shadow: 0px 0px 50px -10px #60606045;
`

interface Props {
    height: string
    width: string
    children?: ReactNode
}

export const StatWindow = ({ height, width, children }: Props) => {
    return (
        <Container $height={height} $width={width}>
            {children}
        </Container>
    )
}
