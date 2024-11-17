import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { QuestionCard } from './QuestionCard'
import { AnswerCard } from './AnswerCard'
import { AnswerButtons } from './AnswerButtons'
import { ShowTranslationButton } from './ShowTranslationButton'
import { postOpenAI } from '../../api/postOpenAI'
import { useValidatedSearchParams } from '../../hooks/useValidatedSearchParams'
import { useFlashAnswer } from '../../hooks/useFlashAnswer'
import { LevelSelectMenu } from './LevelSelectMenu'

const Container = styled.div`
    padding: 1rem 0;
    box-sizing: border-box;
    flex: 1;
    width: 100%;
    max-height: 90%;
    display: flex;
    align-items: center;
    flex-direction: column;

    @media (min-width: 577px) {
        border-radius: 1rem;
        box-shadow: 0px 0px 50px -10px #60606045;
        max-width: 450px;
        /* max-height: 42rem; */
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
    gap: 1rem;
`

interface Props {}

export const Reader = ({}: Props) => {
    const { validatedSearchParams } = useValidatedSearchParams()
    const [level, setLevel] = useState<Level | undefined>()
    const [sentenceList, setSentenceList] = useState<Sentence[]>([])
    const [isTranslationVisible, setIsTranslationVisible] =
        useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(null)
    const { isFlashAnswer, flashAnswer } = useFlashAnswer()

    // console.log(sentenceList.length)

    useEffect(() => {
        setSentenceList([])
    }, [level])

    useEffect(() => {
        setLevel(validatedSearchParams['level'])
    }, [validatedSearchParams])

    useEffect(() => {
        if (sentenceList.length < 10) {
            if (!level) return
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
    }, [sentenceList.length, level])

    const fetchSentences = async (level: Level) => {
        try {
            const sentences = await postOpenAI(level, 'korean', 'english')
            // console.log(sentences)
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

    if (!level)
        return (
            <Container>
                <LevelSelectMenu />
            </Container>
        )

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
                level={level}
                isLoading={isLoading}
                flashAnswer={flashAnswer}
                getNextSentence={goToNextSentence}
            />
        </Container>
    )
}
