import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 4.6rem;
    display: flex;
    align-items: center;
`
const Show = styled.button`
    padding: 0;
    height: 100%;
    width: 100%;
    background-color: #ffd700;
    color: #202020;
    font-size: 1rem;
    font-weight: 600;
    border: none;
`
const AnswerButtonsContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: #202020;
    display: flex;
`
const DifficultyButton = styled.button`
    flex: 1;
    padding: 0;
    height: 100%;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: white;
    font-size: 1.1rem;
    font-weight: 500;
    background: none;
    border: none;
`
const HardButton = styled(DifficultyButton)`
    border-bottom: 4px solid #ff5733;
    &:active {
        background-color: #ff5733;
    }
`
const OkayButton = styled(DifficultyButton)`
    flex: 1.7;
    border-bottom: 4px solid #ffd700;
    &:active {
        background-color: #ffd700;
    }
`

const EasyButton = styled(DifficultyButton)`
    border-bottom: 4px solid #4caf50;
    &:active {
        background-color: #4caf50;
    }
`
interface Props {
    currentSentence: Sentence | undefined
    showAnswer: Boolean
    toggleShowAnswer: () => void
    getNextSentence: () => void
}

export const AnswerButton = ({
    currentSentence,
    showAnswer,
    toggleShowAnswer,
    getNextSentence,
}: Props) => {
    const sendAnswerData = (difficulty: difficulty) => {
        console.log(difficulty, currentSentence)
    }

    const handleClick = (difficulty: difficulty) => {
        // sendAnswerData(difficulty)
        getNextSentence()
        toggleShowAnswer()
    }
    return (
        <Container>
            {showAnswer ? (
                <AnswerButtonsContainer>
                    <HardButton onClick={() => handleClick('hard')}>
                        Hard
                    </HardButton>
                    <OkayButton onClick={() => handleClick('okay')}>
                        Okay
                    </OkayButton>
                    <EasyButton onClick={() => handleClick('easy')}>
                        Easy
                    </EasyButton>
                </AnswerButtonsContainer>
            ) : (
                <Show onClick={() => toggleShowAnswer()}>Show Answer</Show>
            )}
        </Container>
    )
}
