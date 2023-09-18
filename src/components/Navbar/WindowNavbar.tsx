import styled from 'styled-components'
import { WindowNavbarIcon } from './WindowNavbarIcon'

const Container = styled.div`
    display: flex;
    > :not(:first-child) {
        margin-left: 1rem;
    }
`

interface Props {}

export const WindowNavbar = ({}: Props) => {
    return (
        <Container>
            <WindowNavbarIcon type="reader" />
            <WindowNavbarIcon type="statistics" />
            <WindowNavbarIcon type="browser" />
        </Container>
    )
}
