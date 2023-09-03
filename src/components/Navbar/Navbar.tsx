import styled from 'styled-components'
import { LevelMenuButton } from './LevelMenuButton'

const Container = styled.div`
    width: 100%;
    height: 3.6rem;
    background-color: #00405f;
    display: flex;
    align-items: center;
`

interface Props {
    level: level | null
    openLevelMenu: () => void
}

export const Navbar = ({ level, openLevelMenu }: Props) => {
    return (
        <Container>
            {level && (
                <LevelMenuButton level={level} openLevelMenu={openLevelMenu} />
            )}
        </Container>
    )
}
