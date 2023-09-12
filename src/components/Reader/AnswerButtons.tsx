import styled from 'styled-components'
import { useStore } from '../../hooks/useStore'
import '../../themes.css'
import { useAnswerTimer } from '../../hooks/useAnswerTimer'

const Container = styled.div`
    width: 100%;
    height: 4.6rem;
    display: flex;
    align-items: center;
    background-color: var(--answer-button-bg);
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
    isLoading: boolean
    flashAnswer: (difficulty: Difficulty) => void
    getNextSentence: () => void
}

export const AnswerButtons = ({
    currentSentence,
    isLoading,
    flashAnswer,
    getNextSentence,
}: Props) => {
    const {
        // totalTime,
        // sentenceCount,
        // sentenceHistory,
        // wordList,
        incSentenceCount,
        addTotalTime,
        addWordList,
        addSentenceHistory,
    } = useStore()
    const { durationCutoff, level } = useStore()
    const startUnixTime = useAnswerTimer(currentSentence)
    const calcDuration = (): number => {
        // return 0 in the case that time cannot be calculated
        // this is better than not sending the card data / sending incomplete data
        if (!startUnixTime) {
            console.error('startTime not set')
            return 0
        }

        const currentUnixTime = Date.now()
        const duration = currentUnixTime - startUnixTime

        if (duration > durationCutoff) return durationCutoff
        return duration
    }

    const saveAnswerData = (difficulty: Difficulty) => {
        // console.log(totalTime, sentenceCount, wordList, sentenceHistory)
        if (!currentSentence || !level) return
        const duration = calcDuration()
        incSentenceCount()
        addTotalTime(duration)
        addWordList(currentSentence.inputs.seedWord.word, difficulty)
        addSentenceHistory(currentSentence, duration, difficulty, level)
    }

    const handleClick = (difficulty: Difficulty) => {
        saveAnswerData(difficulty)
        flashAnswer(difficulty)
        getNextSentence()
    }

    return (
        <Container>
            <HardButton
                onClick={() => handleClick('hard')}
                disabled={isLoading}
            >
                Hard
            </HardButton>
            <OkayButton
                onClick={() => handleClick('okay')}
                disabled={isLoading}
            >
                Okay
            </OkayButton>
            <EasyButton
                onClick={() => handleClick('easy')}
                disabled={isLoading}
            >
                Easy
            </EasyButton>
        </Container>
    )
}
