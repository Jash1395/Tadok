import styled from 'styled-components'
import { ReactNode } from 'react'

const Container = styled.div`
    width: 100%;
    background-color: var(--card-bg);
    color: var(--card-text);
    border-radius: var(--stats-br);
    box-shadow: 0px 0px 5px -2px #60606053;
`
const ContentContainer = styled.div`
    height: 100%;
    padding: 0.8rem;
    width: calc(100% - 1.6rem);
    display: flex;
    flex-direction: column;
`

interface Props {
    className?: string
    children?: ReactNode
}

export const StatCard = ({ className, children }: Props) => {
    return (
        <Container className={className}>
            <ContentContainer>{children}</ContentContainer>
        </Container>
    )
}
