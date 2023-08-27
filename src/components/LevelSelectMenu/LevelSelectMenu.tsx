import styled from 'styled-components'
import { LevelSelectButton } from './LevelSelectButton'

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`

const Title = styled.p`
    font-size: 1.4rem;
    font-weight: 600;
`

interface Props {
    setLevel: (level: level) => void
}

export const LevelSelectMenu = ({ setLevel }: Props) => {
    return (
        <Container>
            <Title>Choose Your Level</Title>
            <LevelSelectButton level="A1" setLevel={setLevel} />
            <LevelSelectButton level="A2" setLevel={setLevel} />
            <LevelSelectButton level="B1" setLevel={setLevel} />
            <LevelSelectButton level="B2" setLevel={setLevel} />
            <LevelSelectButton level="C1" setLevel={setLevel} />
            <LevelSelectButton level="C2" setLevel={setLevel} />
        </Container>
    )
}
