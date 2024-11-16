import styled from 'styled-components'
import { LevelMenuAnchor } from './LevelMenuAnchor'
import { ThemeButton } from './ThemeButton'
import { useValidatedSearchParams } from '../../hooks/useValidatedSearchParams'
import { WindowNavbar } from './WindowNavbar'
import { LogoutButton } from './LogoutButton'

const Container = styled.div`
    position: fixed;
    height: var(--navbar-height);
    width: 100%;
    top: 0px;
    min-height: 3.6rem;
    background-color: #00405f;
    display: flex;
    align-items: center;
    z-index: 1;
`

const LeftContainer = styled.div`
    flex: 1;
`
const MiddleContainer = styled.div``
const RightContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`

interface Props {}

export const Navbar = ({}: Props) => {
    const { validatedSearchParams } = useValidatedSearchParams()
    const level = validatedSearchParams['level']

    return (
        <Container>
            <LogoutButton />
            <LeftContainer>
                {level && <LevelMenuAnchor level={level} />}
            </LeftContainer>
            <MiddleContainer>
                <WindowNavbar />
            </MiddleContainer>
            <RightContainer>
                <ThemeButton />
            </RightContainer>
        </Container>
    )
}
