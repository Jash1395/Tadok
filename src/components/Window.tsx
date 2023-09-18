import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const Container = styled.div`
    margin-top: var(--navbar-height);
    flex: 1;
    width: 100%;
    background-color: var(--primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

interface Props {}

export const Window = ({}: Props) => {
    return (
        <Container>
            <Outlet />
        </Container>
    )
}
