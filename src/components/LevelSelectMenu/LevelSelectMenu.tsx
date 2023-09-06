import styled from 'styled-components'
import { useState } from 'react'
import { LevelSelectButton } from './LevelSelectButton'

const Container = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ButtonContainer = styled.div`
    flex: 1;
    padding: 1rem 0 5rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const Title = styled.p`
    margin-top: 3.6rem;
    font-size: 1.2rem;
    font-weight: 600;
`

interface Props {
    setLevel: (level: level) => void
}

export const LevelSelectMenu = ({ setLevel }: Props) => {
    const [isClickDisabled, setIsClickDisabled] = useState<boolean>(false)

    const disableClicking = () => {
        setIsClickDisabled(true)
    }

    return (
        <Container>
            <Title>Choose Your Level</Title>
            <ButtonContainer>
                <LevelSelectButton
                    level="A1"
                    setLevel={setLevel}
                    isClickDisabled={isClickDisabled}
                    disableClicking={disableClicking}
                />
                <LevelSelectButton
                    level="A2"
                    setLevel={setLevel}
                    isClickDisabled={isClickDisabled}
                    disableClicking={disableClicking}
                />
                <LevelSelectButton
                    level="B1"
                    setLevel={setLevel}
                    isClickDisabled={isClickDisabled}
                    disableClicking={disableClicking}
                />
                <LevelSelectButton
                    level="B2"
                    setLevel={setLevel}
                    isClickDisabled={isClickDisabled}
                    disableClicking={disableClicking}
                />
                <LevelSelectButton
                    level="C1"
                    setLevel={setLevel}
                    isClickDisabled={isClickDisabled}
                    disableClicking={disableClicking}
                />
                <LevelSelectButton
                    level="C2"
                    setLevel={setLevel}
                    isClickDisabled={isClickDisabled}
                    disableClicking={disableClicking}
                />
            </ButtonContainer>
        </Container>
    )
}
