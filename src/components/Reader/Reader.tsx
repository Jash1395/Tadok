import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { QuestionCard } from './QuestionCard'
import { AnswerCard } from './AnswerCard'
import { AnswerButton } from './AnswerButton'
import { ShowTranslationButton } from './ShowTranslationButton'
import { postOpenAI } from '../../api/postOpenAI'

const Container = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
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
    level: level
}

export const Reader = ({ level }: Props) => {
    const [sentenceList, setSentenceList] = useState<Sentence[]>([])
    const [isTranslationVisible, setIsTranslationVisible] =
        useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        if (sentenceList.length < 10) {
            fetchSentences(level)
            fetchSentences(level)
            fetchSentences(level)
        }

        if (sentenceList.length === 0) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [sentenceList.length])

    const fetchSentences = async (level: level) => {
        try {
            const sentences = await postOpenAI(level, 'korean', 'english')
            if (!sentences) {
                console.error('Failed to fetch sentences.')
                return
            }
            // console.log(`Fetched ${sentences.length} sentences.`)
            appendSentenceList(sentences)
        } catch (error) {
            console.error('Error:', error)
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

    if (loading) {
        return <div>Loading...</div>
    }

    if (error && sentenceList.length === 0) {
        return <div>Error: {error.message}</div>
    }

    if (
        !sentenceList ||
        !sentenceList[0] ||
        !sentenceList[0].answerLang ||
        !sentenceList[0].questionLang
    ) {
        return <div>No sentences found</div>
    }

    return (
        <Container>
            <CardContainer>
                <QuestionCard text={sentenceList[0].questionLang} />
                <AnswerCard
                    text={sentenceList[0].answerLang}
                    inputs={sentenceList[0].inputs}
                    isTranslationVisible={isTranslationVisible}
                    showTranslation={showTranslation}
                />
            </CardContainer>
            <ShowTranslationButton
                isTranslationVisible={isTranslationVisible}
                showTranslation={showTranslation}
            />
            <AnswerButton
                currentSentence={sentenceList[0]}
                getNextSentence={goToNextSentence}
            />
        </Container>
    )
}
