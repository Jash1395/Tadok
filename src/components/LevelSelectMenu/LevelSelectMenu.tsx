import styled from 'styled-components'
import { useState } from 'react'
import { LevelSelectButton } from './LevelSelectButton'
import '../../themes.css'

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
    color: var(--card-text);
    font-size: 1.2rem;
    font-weight: 600;
`

interface Props {}

export const LevelSelectMenu = ({}: Props) => {
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
                    isClickDisabled={isClickDisabled}
                    disableClicking={disableClicking}
                />
                <LevelSelectButton
                    level="A2"
                    isClickDisabled={isClickDisabled}
                    disableClicking={disableClicking}
                />
                <LevelSelectButton
                    level="B1"
                    isClickDisabled={isClickDisabled}
                    disableClicking={disableClicking}
                />
                <LevelSelectButton
                    level="B2"
                    isClickDisabled={isClickDisabled}
                    disableClicking={disableClicking}
                />
                <LevelSelectButton
                    level="C1"
                    isClickDisabled={isClickDisabled}
                    disableClicking={disableClicking}
                />
                <LevelSelectButton
                    level="C2"
                    isClickDisabled={isClickDisabled}
                    disableClicking={disableClicking}
                />
            </ButtonContainer>
        </Container>
    )
}
