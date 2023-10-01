import styled from 'styled-components'
import { ReactElement } from 'react'
import { ResponsiveContainer } from 'recharts'

const Container = styled.div`
    margin-top: 1rem;
    height: 14rem;
    display: flex;
    width: 100%;
    outline: 1px solid red;
`

interface Props {
    children: ReactElement
}

export const ChartContainer = ({ children, ...rest }: Props) => {
    return (
        <Container {...rest}>
            <ResponsiveContainer width="100%" height="100%">
                {children}
            </ResponsiveContainer>
        </Container>
    )
}
