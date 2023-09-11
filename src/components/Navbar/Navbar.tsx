import styled from 'styled-components'
import { LevelMenuButton } from './LevelMenuButton'
import { ThemeButton } from './ThemeButton'

const Container = styled.div`
    width: 100%;
    height: 3.6rem;
    background-color: #00405f;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

interface Props {
    level: Level | null
}

export const Navbar = ({ level }: Props) => {
    return (
        <Container>
            <></>
            {level && <LevelMenuButton level={level} />}
            <ThemeButton />
        </Container>
    )
}
