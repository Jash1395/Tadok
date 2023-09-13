import styled from 'styled-components'
import { LevelMenuAnchor } from './LevelMenuAnchor'
import { ThemeButton } from './ThemeButton'
import { useValidatedSearchParams } from '../../hooks/useValidatedSearchParams'

const Container = styled.div`
    width: 100%;
    height: 3.6rem;
    background-color: #00405f;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

interface Props {}

export const Navbar = ({}: Props) => {
    const { validatedSearchParams } = useValidatedSearchParams()
    const level = validatedSearchParams['level']

    return (
        <Container>
            <></>
            {level && <LevelMenuAnchor level={level} />}
            <ThemeButton />
        </Container>
    )
}
