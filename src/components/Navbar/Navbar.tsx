import styled from 'styled-components'
import { LevelMenuAnchor } from './LevelMenuAnchor'
import { ThemeButton } from './ThemeButton'
import { useValidatedSearchParams } from '../../hooks/useValidatedSearchParams'
import { StatisticsAnchor } from './StatisticsAnchor'
import { WindowNavbar } from './WindowNavbar'

const Container = styled.div`
    position: fixed;
    height: var(--navbar-height);
    width: 100%;
    top: 0px;
    min-height: 3.6rem;
    background-color: #00405f;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const NavigationContainer = styled.div``

interface Props {}

export const Navbar = ({}: Props) => {
    const { validatedSearchParams } = useValidatedSearchParams()
    const level = validatedSearchParams['level']

    return (
        <Container>
            <></>
            {level && <LevelMenuAnchor level={level} />}
            <NavigationContainer>
                <StatisticsAnchor />
            </NavigationContainer>
            <WindowNavbar />
            <ThemeButton />
        </Container>
    )
}
