import styled from 'styled-components'
import '../../styles/themes.css'

const Container = styled.div<{ $visibility: string; $text: string }>`
    flex: 1;
    padding: 1rem;
    width: calc(92% - 2rem);
    max-height: 12rem;
    background-color: var(--card-bg);
    color: var(--card-text);
    border-radius: 0.7rem;
    box-shadow: 3px 3px 10px -2px #6060607d;
    visibility: ${(props) => props.$visibility};

    // this scales the font size down for longer sentences,
    //while not making it too short for very long sentences
    font-size: clamp(
        1.1rem,
        ${(props) => 500 / Math.pow(props.$text.length, 1.3) + 5}px,
        2.5rem
    );
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: keep-all;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Text = styled.p``

const BoldText = styled.p`
    margin-bottom: 1rem;
    font-weight: 600;
`

interface Props {
    currentSentence: Sentence | undefined
    isTranslationVisible: boolean
    isLoading: boolean
}

export const AnswerCard = ({
    currentSentence,
    isTranslationVisible,
    isLoading,
}: Props) => {
    const isVisibile = currentSentence && isTranslationVisible && !isLoading
    const text = currentSentence?.['answerLang'] || ''
    const word = currentSentence?.inputs.seedWord.word || ''
    const definition = currentSentence?.inputs.seedWord.definition || ''

    return (
        <Container $text={text} $visibility={isVisibile ? 'visible' : 'hidden'}>
            <BoldText>{text}</BoldText>
            <Text>{word}</Text>
            <Text>{definition}</Text>
        </Container>
    )
}
