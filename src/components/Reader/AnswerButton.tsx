import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 4.6rem;
    background-color: #202020;
    display: flex;
    align-items: center;
`

const DifficultyButton = styled.button`
    flex: 1;
    padding: 0;
    height: 100%;
    color: white;
    font-size: 1.1rem;
    font-weight: 500;
    background: none;
    border: none;

    transition:
        color 0.5s ease-in,
        text-shadow 0.5s ease-in;

    &:active {
        transition: none;
        animation: fadeBack 0.5s ease-out 0.5s forwards;
    }

    @keyframes fadeBack {
        to {
            color: white;
            border-color: white;
            text-shadow: none;
        }
    }
`
const HardButton = styled(DifficultyButton)`
    border-bottom: 4px solid #ff5733;

    &:active {
        color: #ff5733;
        text-shadow:
            0px 0px 40px #ff573340,
            0px 0px 20px #ff573330,
            0px 0px 10px #ff573330;
    }
`

const OkayButton = styled(DifficultyButton)`
    flex: 1.7;
    border-bottom: 4px solid #ffd700;

    &:active {
        color: #ffd700;
        text-shadow:
            0px 0px 40px #ffd70040,
            0px 0px 20px #ffd70030,
            0px 0px 10px #ffd70030;
    }
`

const EasyButton = styled(DifficultyButton)`
    border-bottom: 4px solid #4caf50;
    &:active {
        color: #4caf50;
        text-shadow:
            0px 0px 40px #4caf5040,
            0px 0px 20px #4caf5030,
            0px 0px 10px #4caf5030;
    }
`
interface Props {
    currentSentence: Sentence | undefined
    flashAnswer: (difficulty: Difficulty) => void
    getNextSentence: () => void
}

export const AnswerButton = ({
    currentSentence,
    flashAnswer,
    getNextSentence,
}: Props) => {
    const sendAnswerData = (difficulty: Difficulty) => {
        console.log(difficulty, currentSentence)
    }

    const handleClick = (difficulty: Difficulty) => {
        flashAnswer(difficulty)
        sendAnswerData(difficulty)
        getNextSentence()
    }

    return (
        <Container>
            <HardButton onClick={() => handleClick('hard')}>Hard</HardButton>
            <OkayButton onClick={() => handleClick('okay')}>Okay</OkayButton>
            <EasyButton onClick={() => handleClick('easy')}>Easy</EasyButton>
        </Container>
    )
}
