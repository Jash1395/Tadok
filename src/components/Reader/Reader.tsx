import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { QuestionCard } from './QuestionCard'
import { AnswerCard } from './AnswerCard'
import { AnswerButton } from './AnswerButton'
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
    const [sentenceList, setSentenceList] = useState<sentence[]>()
    const [showAnswer, setShowAnswer] = useState<Boolean>(false)
    const [loading, setLoading] = useState<Boolean>(true)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        const fetchSentences = async (level: level) => {
            console.log(level)
            try {
                const response = await postOpenAI()
                const data = response.data
                console.log(data)

                setSentenceList(data)
                setLoading(false)
            } catch (error) {
                console.error('Error:', error)
                setError(error)
                setLoading(false)
            }
        }

        fetchSentences(level)
    }, [])

    const getNextSentence = () => {
        const newList = sentenceList?.slice(1)
        setSentenceList(newList)
    }

    const toggleShowAnswer = () => {
        setShowAnswer(!showAnswer)
    }
    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
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
                    showAnswer={showAnswer}
                />
            </CardContainer>
            <AnswerButton
                currentSentence={sentenceList[0]}
                showAnswer={showAnswer}
                toggleShowAnswer={toggleShowAnswer}
                getNextSentence={getNextSentence}
            />
        </Container>
    )
}
