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
    const [isDisabled, setIsDisabled] = useState<boolean>(false)

    const disable = () => {
        setIsDisabled(true)
    }

    return (
        <Container>
            <Title>Choose Your Level</Title>
            <ButtonContainer>
                <LevelSelectButton
                    level="A1"
                    isDisabled={isDisabled}
                    disable={disable}
                />
                <LevelSelectButton
                    level="A2"
                    isDisabled={isDisabled}
                    disable={disable}
                />
                <LevelSelectButton
                    level="B1"
                    isDisabled={isDisabled}
                    disable={disable}
                />
                <LevelSelectButton
                    level="B2"
                    isDisabled={isDisabled}
                    disable={disable}
                />
                <LevelSelectButton
                    level="C1"
                    isDisabled={isDisabled}
                    disable={disable}
                />
                <LevelSelectButton
                    level="C2"
                    isDisabled={isDisabled}
                    disable={disable}
                />
            </ButtonContainer>
        </Container>
    )
}
