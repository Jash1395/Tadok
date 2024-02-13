import styled from 'styled-components'
import { useStore } from '../../hooks/useStore'
import { useAnswerTimer } from '../../hooks/useAnswerTimer'
import { calcAnswerDuration } from '../../utils/calcAnswerDuration'
import { postAnswerData } from '../../api/postAnswerData'
import '../../styles/themes.css'

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
    level: Level | null
    isLoading: boolean
    flashAnswer: (difficulty: Difficulty) => void
    getNextSentence: () => void
}

export const AnswerButtons = ({
    currentSentence,
    level,
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
    const { durationCutoff } = useStore()
    const startUnixTime = useAnswerTimer(currentSentence)

    const updateLocalStore = (difficulty: Difficulty, duration: number) => {
        // console.log(totalTime, sentenceCount, wordList, sentenceHistory)
        if (!currentSentence || !level) return
        incSentenceCount()
        addTotalTime(duration)
        addWordList(currentSentence.inputs.seedWord.word, difficulty)
        addSentenceHistory(currentSentence, duration, difficulty, level)
    }

    const handleClick = async (difficulty: Difficulty) => {
        const duration = calcAnswerDuration(startUnixTime, durationCutoff)
        console.log(duration)
        flashAnswer(difficulty)
        getNextSentence()

        if (!currentSentence?.['questionLang']) {
            console.error('No sentence')
            return
        }

        if (!level) {
            console.error('No level')
            return
        }

        updateLocalStore(difficulty, duration)
        postAnswerData(
            currentSentence['questionLang'],
            currentSentence.inputs.seedWord.word,
            currentSentence.inputs.seedWord.definition,
            difficulty,
            level,
            duration
        )
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
