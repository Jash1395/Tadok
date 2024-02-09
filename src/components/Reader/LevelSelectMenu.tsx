import styled from 'styled-components'
import { useState } from 'react'
import { LevelSelectReaderAnchor } from './LevelSelectReaderAnchor'
import '../../styles/themes.css'

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
                <LevelSelectReaderAnchor
                    level="A1"
                    isDisabled={isDisabled}
                    disable={disable}
                />
                <LevelSelectReaderAnchor
                    level="A2"
                    isDisabled={isDisabled}
                    disable={disable}
                />
                <LevelSelectReaderAnchor
                    level="B1"
                    isDisabled={isDisabled}
                    disable={disable}
                />
                <LevelSelectReaderAnchor
                    level="B2"
                    isDisabled={isDisabled}
                    disable={disable}
                />
                <LevelSelectReaderAnchor
                    level="C1"
                    isDisabled={isDisabled}
                    disable={disable}
                />
                <LevelSelectReaderAnchor
                    level="C2"
                    isDisabled={isDisabled}
                    disable={disable}
                />
            </ButtonContainer>
        </Container>
    )
}
