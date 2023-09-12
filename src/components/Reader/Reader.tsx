import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { QuestionCard } from './QuestionCard'
import { AnswerCard } from './AnswerCard'
import { AnswerButtons } from './AnswerButtons'
import { ShowTranslationButton } from './ShowTranslationButton'
import { postOpenAI } from '../../api/postOpenAI'

const Container = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    @media (min-width: 577px) {
        border-radius: 1rem;
        box-shadow: 0px 0px 50px -10px #60606045;
        max-width: 450px;
        max-height: 42rem;
        overflow: hidden;
    }
`
const CardContainer = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
`

interface Props {
    level: Level
}

export const Reader = ({ level }: Props) => {
    const [sentenceList, setSentenceList] = useState<Sentence[]>([])
    const [isTranslationVisible, setIsTranslationVisible] =
        useState<boolean>(false)
    const [isFlashAnswer, setIsFlashAnswer] = useState<Difficulty | false>(
        false
    )
    // const [startUnixTime, setStartUnixTime] = useState<number | undefined>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        if (sentenceList.length < 10) {
            fetchSentences(level)
            fetchSentences(level)
            fetchSentences(level)
        }

        if (sentenceList.length === 0) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
            setError(false)
        }
    }, [sentenceList.length])

    const fetchSentences = async (level: Level) => {
        try {
            const sentences = await postOpenAI(level, 'korean', 'english')
            if (!sentences) {
                throw Error('Failed to fetch sentences.')
            }
            appendSentenceList(sentences)
        } catch (error) {
            console.error('Error:', error)
            if (sentenceList.length > 0) return
            setError(error)
        }
    }

    const flashAnswer = (difficulty: Difficulty) => {
        // toggle isFlashAnswer to reset any active animations
        setIsFlashAnswer(false)
        setTimeout(() => {
            setIsFlashAnswer(difficulty)
        }, 1)
    }

    const appendSentenceList = (newSentences: Sentence[]) => {
        setSentenceList((sentenceList) => [...sentenceList, ...newSentences])
    }

    const goToNextSentence = () => {
        setIsTranslationVisible(false)
        const newList = sentenceList?.slice(1)
        setSentenceList(newList)
    }

    const showTranslation = () => {
        setIsTranslationVisible(true)
    }

    if (error && sentenceList.length === 0) {
        return <div>Error: {error.message}</div>
    }

    return (
        <Container>
            <CardContainer>
                <QuestionCard
                    currentSentence={sentenceList[0]}
                    isFlashAnswer={isFlashAnswer}
                    isLoading={isLoading}
                />
                <AnswerCard
                    currentSentence={sentenceList[0]}
                    isTranslationVisible={isTranslationVisible}
                    isLoading={isLoading}
                />
            </CardContainer>
            <ShowTranslationButton
                isTranslationVisible={isTranslationVisible}
                isLoading={isLoading}
                showTranslation={showTranslation}
            />
            <AnswerButtons
                currentSentence={sentenceList[0]}
                isLoading={isLoading}
                flashAnswer={flashAnswer}
                getNextSentence={goToNextSentence}
            />
        </Container>
    )
}
